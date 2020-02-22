//#include "src/cnfparser.hh"
//#include "src/core/origin/Dpll.hh"
#include "src/core/final/Dpll.hh"
#include "src/core/origin/Dpll.hh"
#include "src/writeRes.hh"
auto main(int argc, char **argv) -> int {
    final::Dpll dpll(final::cnfParser(std::string(argv[1])));
    auto res = dpll.solve();
    final::writeRes(res.first, res.second, dpll.getCnf().litSet, std::string(argv[2]));
    return 0;
}
