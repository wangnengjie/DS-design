//#include "src/cnfparser.hh"
//#include "src/core/origin/Dpll.hh"
#include "src/core/final/Dpll.hh"
#include <chrono>
#include <iostream>
auto main(int argc, char **argv) -> int {
    //    //    std::cout << "hello" << std::endl;
    //    auto &&cnf = origin::parser();
    //    //    std::cout << "hello" << std::endl;
    //    origin::Dpll dpll;
    //    dpll.solve(cnf);
    //    std::cout << dpll.getResult() << std::endl;
    //    for (int i = 1; i < dpll.getDetails().size(); i++) {
    //        if (dpll.getDetails()[i].state == origin::State::satisfied) {
    //            std::cout << " " << i << " ";
    //        } else if (dpll.getDetails()[i].state == origin::State::unsatisfied) {
    //            std::cout << " " << -i << " ";
    //        } else {
    //            std::cout << "unknown";
    //        }
    //    }
    final::Dpll dpll(final::cnfParser(std::string(argv[1])));
    std::cout << "finish parse" << std::endl;
    auto res = dpll.solve();
    std::cout << res.first << std::endl << res.second << std::endl;
    for (int i = 1; i < dpll.getCnf().litSet.size(); i++) {
        if (dpll.getCnf().litSet[i].state == final::State::satisfied) {
            std::cout << " " << i << " ";
        } else if (dpll.getCnf().litSet[i].state == final::State::unsatisfied) {
            std::cout << " " << -i << " ";
        } else {
            std::cout << " unknown ";
        }
    }
    return 0;
}
