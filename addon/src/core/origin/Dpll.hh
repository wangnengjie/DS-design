//
// Created by panda on 2020/2/3.
//

#ifndef CORE_ORIGIN_DPLL_HH
#define CORE_ORIGIN_DPLL_HH

#include "Cnf.hh"
namespace origin {
class Dpll {
  private:
    State result;
    Literals details;

  public:
    auto getResult() -> State { return result; };
    auto getDetails() -> const Literals & { return details; };
    auto solve(Cnf &cnf) -> bool;
    auto solve(Cnf &&cnf) -> bool;
};
} // namespace origin
#endif // CORE_ORIGIN_DPLL_HH
