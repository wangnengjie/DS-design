//
// Created by panda on 2020/2/28.
//
#include "genSudoku.hh"
#include "GenCnf.hh"
#include <cstdlib>
#include <unordered_set>

auto genSudoku(int rank) -> std::vector<int> {
    final::Cnf cnf = GenCnf(rank).generate();
    final::Literals litSet = genFinal(rank, cnf);
    //    for (int i = 1; i <= rank * rank; i++) {
    //        std::cout << " " << ((litSet[i].state == final::satisfied) ? i : -i);
    //    }
    //    std::cout << std::endl;

    return digHole(rank, litSet, cnf);
}

auto genFinal(int rank, const final::Cnf &_cnf) -> final::Literals {
    do {
        final::Cnf cnf = _cnf;
        std::unordered_set<int> nums;
        for (int i = 0; i < rank; i++) {
            nums.insert(rand() % (rank * rank) + 1);
        }
        for (auto &num : nums) {
            final::Clause cla({num}, 0, 0);
            cnf.addClause(cla);
        }
        final::Dpll dpll(cnf);
        auto res = dpll.solve();
        if (res.first == final::satisfied) {
            return dpll.getCnf().litSet;
        }
    } while (true);
}

auto digHole(int rank, const final::Literals &finalLits, const final::Cnf &originCnf)
    -> std::vector<int> {
    int size = rank * rank;
    std::vector<final::Clause> clas(size + 1);
    std::vector<bool> table(size + 1, false);
    for (int i = 1; i <= size; i++) {
        clas[i] = {{finalLits[i].state == final::satisfied ? i : -i}, 0, 0};
    }

    for (int i = 1; i <= size; i++) {
        final::Cnf cnf = originCnf;
        final::Clause cpCla = clas[i];
        cpCla.getLits()[0] = -cpCla.getLits()[0];
        cnf.addClause(cpCla);
        for (int j = 1; j <= size; j++) {
            if (!table[j] && j != i) {
                cnf.addClause(clas[j]);
            }
        }
        auto res = final::Dpll(cnf).solve();
        if (res.first != final::satisfied) {
            table[i] = true;
        }
    }

    std::vector<int> res;
    for (int i = 1; i <= size; i++) {
        if (!table[i]) {
            res.push_back(clas[i].getLits()[0]);
        }
    }
    return std::move(res);
}
