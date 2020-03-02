//
// Created by panda on 2020/2/11.
//

#ifndef CORE_FINAL_DPLL_HH
#define CORE_FINAL_DPLL_HH
#pragma once

#include "Cnf.hh"
#include <atomic>
#include <set>
#include <stack>
namespace final {

struct vCmp {
    bool operator()(const std::pair<int, int> &a, const std::pair<int, int> &b) const {
        if (a.second > b.second) {
            return true;
        }
        if (a.second < b.second) {
            return false;
        }
        return a.first < b.first;
    }
};

class VCounter {
  private:
    std::set<std::pair<int, int>, vCmp> counter;
    decltype(counter)::iterator it;

  public:
    explicit VCounter(std::vector<int> &countData);
    auto hasNext() -> bool { return it != counter.end(); };
    auto reset() -> void { it = counter.begin(); };
    auto next() -> int;
};

class Dpll {
  private:
    static const int MAX_SOLVE_TIME = 7200; // second
    Cnf cnf;
    std::stack<std::pair<int, bool>> decideStack;
    std::stack<std::list<int>> assignStack;
    std::atomic_bool outOfTime = false;
    std::atomic_bool solved = false;
    std::shared_ptr<VCounter> vc;

  public:
    explicit Dpll(Cnf _cnf);

  public:
    auto getCnf() -> Cnf & { return cnf; };
    auto solve() -> std::pair<State, double>;
    auto preload() -> bool;

  private:
    auto bcp() -> bool;
    auto resolveConflict() -> bool;
    auto decide() -> bool;
    auto checkTime() -> void;
};
} // namespace final

#endif // CORE_FINAL_DPLL_HH
