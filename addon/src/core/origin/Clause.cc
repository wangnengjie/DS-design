//
// Created by panda on 2020/2/1.
//
#include "Clause.hh"

namespace origin {
auto Clause::assign(lit lit) -> bool {
    auto pos1 = literals.find(lit);
    auto pos2 = literals.find(-lit);
    if (pos1 != literals.end()) {
        literals.erase(pos1);
        return true;
    }
    if (pos2 != literals.end()) {
        literals.erase(pos2);
        return false;
    }
    return false;
}
} // namespace origin
