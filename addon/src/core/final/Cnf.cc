//
// Created by panda on 2020/2/10.
//

#include "Cnf.hh"
#include <fstream>
#include <string>
#include <unordered_set>

namespace final {

auto Cnf::addClause(Clause &cla) -> void {
    std::shared_ptr<Clause> ptr =
        std::make_shared<Clause>(Clause(cla.getLits(), 0, cla.getLits().size() - 1));
    claSet.push_front(ptr);
    for(auto & v:ptr->getLits()){
        litSet[std::abs(v)].cnClas.push_front(ptr);
    }
}

auto Cnf::cnfParser(const std::string &path) -> Cnf {
    std::ifstream file(path);
    std::string s;
    while (true) {
        if (file.get() != 'c') {
            break;
        }
        std::getline(file, s);
    }
    int litSize;
    int claSize;
    file >> s >> litSize >> claSize;
    Cnf cnf{Literals(litSize + 1, {unknown, std::list<std::shared_ptr<Clause>>()}),
            std::list<std::shared_ptr<Clause>>()};
    for (int i = 0; i < claSize; i++) {
        int num;
        bool shouldAdd = true;
        std::unordered_set<int> set;
        std::vector<int> lits;
        while (file >> num && num != 0) {
            if (set.find(-num) != set.end()) {
                shouldAdd = false;
            } else if (set.find(num) == set.end() && shouldAdd) {
                lits.push_back(num);
                set.insert(num);
            }
        }
        if (shouldAdd) {
            auto cla = std::make_shared<Clause>(Clause(lits, 0, lits.size() - 1));
            cnf.claSet.push_back(cla);
            for (auto it : lits) {
                cnf.litSet[std::abs(it)].cnClas.push_back(cla);
            }
        }
    }
    file.close();
    return std::move(cnf);
}

auto Cnf::cnfParser(std::istringstream &instr) -> Cnf {
    std::string s;
    while (true) {
        if (instr.get() != 'c') {
            break;
        }
        std::getline(instr, s);
    }
    int litSize;
    int claSize;
    instr >> s >> litSize >> claSize;
    Cnf cnf{Literals(litSize + 1, {unknown, std::list<std::shared_ptr<Clause>>()}),
            std::list<std::shared_ptr<Clause>>()};
    for (int i = 0; i < claSize; i++) {
        int num;
        bool shouldAdd = true;
        std::unordered_set<int> set;
        std::vector<int> lits;
        while (instr >> num && num != 0) {
            if (set.find(-num) != set.end()) {
                shouldAdd = false;
            } else if (set.find(num) == set.end() && shouldAdd) {
                lits.push_back(num);
                set.insert(num);
            }
        }
        if (shouldAdd) {
            auto cla = std::make_shared<Clause>(Clause(lits, 0, lits.size() - 1));
            cnf.claSet.push_back(cla);
            for (auto it : lits) {
                cnf.litSet[std::abs(it)].cnClas.push_back(cla);
            }
        }
    }
    return std::move(cnf);
}

auto Cnf::cnfParser(int litSize, const std::list<std::list<int>> &clas) -> Cnf {
    Cnf cnf{Literals(litSize + 1, {unknown, std::list<std::shared_ptr<Clause>>()}),
            std::list<std::shared_ptr<Clause>>()};
    for (auto &cla : clas) {
        int num;
        bool shouldAdd = true;
        std::unordered_set<int> set;
        std::vector<int> lits;
        for (auto &lit : cla) {
            if (set.find(-lit) != set.end()) {
                shouldAdd = false;
            } else if (set.find(lit) == set.end() && shouldAdd) {
                lits.push_back(lit);
                set.insert(lit);
            }
        }
        if (shouldAdd) {
            auto clause = std::make_shared<Clause>(Clause(lits, 0, lits.size() - 1));
            cnf.claSet.push_back(clause);
            for (auto it : lits) {
                cnf.litSet[std::abs(it)].cnClas.push_back(clause);
            }
        }
    }
    return std::move(cnf);
}
} // namespace final