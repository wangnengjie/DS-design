//
// Created by panda on 2020/2/3.
//
#include "Dpll.hh"

namespace origin {
auto Dpll::solve(Cnf &&cnf) -> bool { return solve(cnf); }

auto Dpll::solve(Cnf &cnf) -> bool {
    while (true) {
        auto unit = cnf.findUnit();
        if (unit == 0) {
            break;
        }
        cnf.simplify(unit);
        auto res = cnf.check();
        if (res != State::unknown) {
            result = res;
            details = cnf.getLiterals();
            return res == State::satisfied;
        }
    }
    auto unit = cnf.chooseUnit();
    if (unit == 0) {
        result = State::unknown;
        details = cnf.getLiterals();
        return false;
    }
    Cnf cpCnf = cnf;
    cnf.assignUnit(unit);
    cpCnf.assignUnit(-unit);
    if (solve(cnf)) {
        return true;
    }
    return solve(cpCnf);
}
} // namespace origin