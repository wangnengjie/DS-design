//
// Created by panda on 2020/2/10.
//

#include "Cnf.hh"
#include <iostream>
#include <string>
#include <unordered_set>

namespace final {
auto cnfParser() -> Cnf {
    std::string s;
    while (true) {
        if (std::cin.get() != 'c') {
            break;
        }
        std::getline(std::cin, s);
    }
    int litSize;
    int claSize;
    scanf_s(" cnf %d %d", &litSize, &claSize);
    Cnf cnf{Literals(litSize + 1, {unknown, std::list<std::shared_ptr<Clause>>()}),
            std::list<std::shared_ptr<Clause>>()};
    getchar();
    for (int i = 0; i < claSize; i++) {
        int num;
        bool shouldAdd = true;
        std::unordered_set<int> set;
        std::vector<int> lits;
        while (std::cin >> num && num != 0) {
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
} // namespace final