//
// Created by panda on 2020/2/10.
//

#ifndef CORE_FINAL_CNF_HH
#define CORE_FINAL_CNF_HH
#pragma once

#include "Clause.hh"
#include <sstream>
#include <string>
#include <iostream>
namespace final {
struct Cnf {
    Literals litSet;
    std::list<std::shared_ptr<Clause>> claSet;
};
auto cnfParser(const std::string &path) -> Cnf;
auto cnfParser(std::istringstream &instr) -> Cnf;
} // namespace final

#endif // CORE_FINAL_CNF_HH
