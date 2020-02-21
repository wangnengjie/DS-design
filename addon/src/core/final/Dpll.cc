//
// Created by panda on 2020/2/11.
//

#include "Dpll.hh"
#include <chrono>
#include <iostream>
#include <queue>
#include <thread>
namespace final {
VCounter::VCounter(std::vector<int> &countData) {
    for (int i = 2; i < countData.size(); i++) {
        counter.insert({i % 2 == 0 ? i / 2 : -(i / 2), countData[i]});
    }
    reset();
}

auto VCounter::next() -> int {
    if (!hasNext()) {
        return 0;
    }
    int v = it->first;
    it++;
    return v;
}

Dpll::Dpll(Cnf _cnf) {
    cnf = std::move(_cnf);
    std::vector<int> countData(cnf.litSet.size() << 1, 0);
    for (const auto &cla : cnf.claSet) {
        for (const auto &lit : cla->getLits()) {
            if (lit > 0) {
                countData[lit << 1]++;
            } else if (lit < 0) {
                countData[((-lit) << 1) + 1]++;
            }
        }
    }
    vc = std::make_shared<VCounter>(VCounter(countData));
}

auto Dpll::checkTime() -> void {
    auto cstart = std::chrono::steady_clock::now();
    while (!solved && std::chrono::duration_cast<std::chrono::seconds>(
                          std::chrono::steady_clock::now() - cstart)
                              .count() < MAX_SOLVE_TIME) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    if (!solved) {
        outOfTime = true;
    }
}

auto Dpll::solve() -> std::pair<State, double> {
    auto cstart = std::chrono::steady_clock::now();
    std::thread t1(&Dpll::checkTime, this);
    if (!preload()) {
        auto cend = std::chrono::steady_clock::now();
        solved = true;
        t1.join();
        return {unsatisfied,
                std::chrono::duration_cast<std::chrono::microseconds>(cend - cstart).count() /
                    1000.0};
    }
    while (true) {
        if (outOfTime) {
            return {unknown, 0};
        }
        if (!decide()) {
            auto cend = std::chrono::steady_clock::now();
            solved = true;
            t1.join();
            return {satisfied,
                    std::chrono::duration_cast<std::chrono::microseconds>(cend - cstart).count() /
                        1000.0};
        }
        while (!bcp()) {
            if (!resolveConflict()) {
                auto cend = std::chrono::steady_clock::now();
                solved = true;
                t1.join();
                return {
                    unsatisfied,
                    std::chrono::duration_cast<std::chrono::microseconds>(cend - cstart).count() /
                        1000.0};
            }
        }
    }
}

auto Dpll::preload() -> bool {
    std::queue<int> assignLits;
    for (auto &cla : cnf.claSet) {
        if (cla->getState(cnf.litSet) == unit) {
            assignLits.push(cla->getLits()[0]);
        }
    }
    while (!assignLits.empty()) {
        auto lit = assignLits.front();
        assignLits.pop();
        cnf.litSet[std::abs(lit)].state = lit > 0 ? satisfied : unsatisfied;
        for (auto &cla : cnf.litSet[std::abs(lit)].cnClas) {
            auto res = cla->assign(lit, cnf.litSet);
            switch (res.first) {
            case unit:
                assignLits.push(res.second);
                break;
            case unsatisfied:
                return false;
            default:
                break;
            }
        }
    }
    return true;
}

auto Dpll::bcp() -> bool {
    std::queue<int> assignLits;
    assignLits.push(decideStack.top().first);
    while (!assignLits.empty()) {
        auto lit = assignLits.front();
        assignLits.pop();
        cnf.litSet[std::abs(lit)].state = lit > 0 ? satisfied : unsatisfied;
        assignStack.top().push_back(lit);
        for (auto &cla : cnf.litSet[std::abs(lit)].cnClas) {
            auto res = cla->assign(lit, cnf.litSet);
            switch (res.first) {
            case unit:
                assignLits.push(res.second);
                break;
            case unsatisfied:
                return false;
            default:
                break;
            }
        }
    }
    return true;
}

auto Dpll::resolveConflict() -> bool {
    while (!decideStack.empty()) {
        for (auto v : assignStack.top()) {
            cnf.litSet[std::abs(v)].state = unknown;
        }
        cnf.litSet[std::abs(decideStack.top().first)].state = unknown;
        if (decideStack.top().second) { // both 1 and -1 has tried
            decideStack.pop();
            assignStack.pop();
            continue;
        }
        decideStack.top().first = -decideStack.top().first;
        decideStack.top().second = true;
        assignStack.top().clear();
        vc->reset();
        return true;
    }
    return false;
}

auto Dpll::decide() -> bool {
    while (vc->hasNext()) {
        int v = vc->next();
        if (cnf.litSet[std::abs(v)].state != unknown) {
            continue;
        }
        decideStack.push({v, false});
        assignStack.push(std::list<int>());
        return true;
    }
    return false;
}
} // namespace final
