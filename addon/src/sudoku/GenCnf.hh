//
// Created by panda on 2020/2/28.
//

#ifndef DS_DESIGN_GENCNF_HH
#define DS_DESIGN_GENCNF_HH
#pragma once
#include "../core/final/Cnf.hh"

class GenCnf {
  public:
    int count = 1;
    int rank;
    std::vector<std::vector<int>> table;
    std::list<std::list<int>> clauses;

  public:
    explicit GenCnf(int _rank);
    auto generate() -> final::Cnf;

  private:
    auto rule1() -> void;
    auto rule2() -> void;
    auto rule3() -> void;

  private:
    auto rule2helper(int index, int start, std::vector<std::list<int>> &tempRes,
                     decltype(clauses) &result) -> void;
};

#endif // DS_DESIGN_GENCNF_HH
