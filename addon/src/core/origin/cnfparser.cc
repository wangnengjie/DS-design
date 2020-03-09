//
// Created by panda on 2020/2/3.
//
#include "cnfparser.hh"
#include <cstdio>
#include <iostream>
#include <string>

auto origin::parser() -> Cnf {
    std::string s;
    while (true) {
        if (std::cin.get() != 'c') {
            break;
        }
        std::getline(std::cin, s);
    }
    int litSize, claSize;
    scanf(" cnf %d %d", &litSize, &claSize);
    Literals literals(litSize + 1, {State::unknown});
    Clauses clauses(claSize, Clause{std::unordered_set<lit>()});
    getchar();
    for (auto &cla : clauses) {
        lit num;
        while (std::cin >> num && num != 0) {
            cla.getLiterals().insert(num);
        }
    }
    std::cin.sync();
    return std::move(Cnf{literals, clauses});
}