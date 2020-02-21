//
// Created by panda on 2020/2/1.
//

#ifndef CORE_ORIGIN_CLAUSE_HH
#define CORE_ORIGIN_CLAUSE_HH
#pragma once

#include "Literal.hh"
#include <unordered_set>
#include <utility>
namespace origin {
class Clause {
  private:
    std::unordered_set<lit> literals;

  public:
    explicit Clause(std::unordered_set<lit> literals) : literals(std::move(literals)){};

  public:
    auto isEmpty() -> bool { return literals.empty(); };
    auto isUnit() -> bool { return literals.size() == 1; };
    auto getFront() -> lit { return *literals.begin(); };
    auto getLiterals() -> std::unordered_set<lit> & { return literals; };

  public:
    auto assign(lit lit) -> bool;
};
} // namespace origin

#endif // CORE_ORIGIN_CLAUSE_HH
