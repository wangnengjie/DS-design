//
// Created by panda on 2020/2/1.
//

#include "Cnf.hh"
#include <ctime>
#include <random>

namespace origin {
auto Cnf::findUnit() -> lit {
    auto pos = std::find_if(claSet.begin(), claSet.end(), [](Clause &cla) { return cla.isUnit(); });
    return pos == claSet.end() ? 0 : pos->getFront();
}

auto Cnf::chooseUnit() -> lit {
    static std::default_random_engine e(std::time(0));
    std::vector<lit> l;
    for (int i = 1; i < litSet.size(); i++) {
        if (litSet[i].state == State::unknown) {
            l.push_back(i);
        }
    }
    if (l.empty()) {
        return 0;
    }
    std::uniform_int_distribution<unsigned> dis(0, l.size() - 1);
    return l[dis(e)];
}

auto Cnf::simplify(lit v) -> void {
    auto &literal = litSet[std::abs(v)];
    literal.state = v > 0 ? State::satisfied : State::unsatisfied;
    for (auto it = claSet.begin(); it != claSet.end();) {
        if (it->assign(v)) {
            it = claSet.erase(it);
        } else {
            it++;
        }
    }
}

auto Cnf::check() -> State {
    if (claSet.empty()) {
        return State::satisfied;
    }
    for (auto &it : claSet) {
        if (it.isEmpty()) {
            return State::unsatisfied;
        }
    }
    return State::unknown;
}
} // namespace origin