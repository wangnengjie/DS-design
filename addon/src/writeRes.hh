//
// Created by panda on 2020/2/22.
//

#ifndef DS_DESIGN_WRITERES_HH
#define DS_DESIGN_WRITERES_HH
#pragma once

#include "core/final/Clause.hh"
#include <fstream>
#include <string>
namespace final {
auto writeRes(State s, double time, Literals &lits, std::string path) -> void;
}

#endif // DS_DESIGN_WRITERES_HH
