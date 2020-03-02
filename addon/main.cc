#include "src/core/final/Dpll.hh"
#include "src/core/origin/Dpll.hh"
#include "src/sudoku/genSudoku.hh"
#include "src/writeRes.hh"
#include <cstdlib>
#include <ctime>
auto main(int argc, char **argv) -> int {
    srand(time(nullptr));
    if (std::string("--solver") == argv[1]) {
        final::Dpll dpll(final::Cnf::cnfParser(std::string(argv[2])));
        auto res = dpll.solve();
        final::writeRes(res.first, res.second, dpll.getCnf().litSet, std::string(argv[3]));
    } else if (std::string("--gen") == argv[1]) {
        std::vector<int> res = genSudoku(std::stoi(argv[2]));
        for (auto &lit : res) {
            std::cout << lit << " ";
        }
        std::cout << std::endl;
    }
    return 0;
}
