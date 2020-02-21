//
// Created by panda on 2020/2/1.
//

#ifndef CORE_ORIGIN_CNF_HH
#define CORE_ORIGIN_CNF_HH
#pragma once
#include "Clause.hh"
#include "Literal.hh"
#include <list>
#include <vector>

namespace origin {
using Literals = std::vector<Literal>;
using Clauses = std::list<Clause>;
class Cnf {
  private:
    Literals litSet;
    Clauses claSet;

  public:
    Cnf(Literals lits, Clauses clas) : litSet(std::move(lits)), claSet(std::move(clas)){};

  public:
    auto getLiterals() -> Literals { return litSet; };
    auto assignUnit(lit v) -> void { claSet.push_front(Clause({v})); };
    auto findUnit() -> lit;
    auto chooseUnit() -> lit;
    auto simplify(lit v) -> void;
    auto check() -> State;
};
} // namespace origin

#endif // CORE_ORIGIN_CNF_HH
