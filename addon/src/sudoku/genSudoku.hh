//
// Created by panda on 2020/2/28.
//

#ifndef DS_DESIGN_GENSUDOKU_HH
#define DS_DESIGN_GENSUDOKU_HH
#pragma once
#include "../core/final/Dpll.hh"

auto genSudoku(int rank) -> std::vector<int>;
auto genFinal(int rank, const final::Cnf &cnf) -> final::Literals;
auto digHole(int rank, const final::Literals &finalLits, const final::Cnf &originCnf)
    -> std::vector<int>;
#endif // DS_DESIGN_GENSUDOKU_HH
