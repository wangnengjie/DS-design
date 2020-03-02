//
// Created by panda on 2020/2/10.
//

#ifndef CORE_FINAL_CNF_HH
#define CORE_FINAL_CNF_HH
#pragma once

#include "Clause.hh"
#include <iostream>
#include <sstream>
#include <string>
#include <utility>
namespace final {
class Cnf {
  public:
    Literals litSet;
    std::list<std::shared_ptr<Clause>> claSet;
    Cnf() = default;
    Cnf(Literals _litSet, std::list<std::shared_ptr<Clause>> _claSet)
        : litSet(std::move(_litSet)), claSet(std::move(_claSet)){};

  public:
    auto addClause(Clause &cla) -> void;
    static auto cnfParser(const std::string &path) -> Cnf;
    static auto cnfParser(std::istringstream &instr) -> Cnf;
    static auto cnfParser(int litSize, const std::list<std::list<int>>& clas) -> Cnf;
};
} // namespace final

#endif // CORE_FINAL_CNF_HH
