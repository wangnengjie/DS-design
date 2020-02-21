//
// Created by panda on 2020/2/9.
//

#ifndef CORE_FINAL_CLAUSE_HH
#define CORE_FINAL_CLAUSE_HH
#pragma once
#include <list>
#include <memory>
#include <vector>
namespace final {
enum State { unsatisfied = -1, unknown, satisfied, unit };
class Clause;
struct Literal {
    State state;
    std::list<std::shared_ptr<Clause>> cnClas; // connect clauses
};
using Literals = std::vector<Literal>;

class Clause {
  private:
    std::vector<int> lits;
    unsigned int ptr1;
    unsigned int ptr2;

  public:
    Clause(std::vector<int> lits, unsigned int ptr1, unsigned int ptr2)
        : lits(std::move(lits)), ptr1(ptr1), ptr2(ptr2){};

  public:
    auto getLits() -> std::vector<int> & { return lits; };
    auto getState(Literals &litSet) -> State;
    auto assign(int v, Literals &litSet) -> std::pair<State, int>;
};
} // namespace final

#endif // CORE_FINAL_CLAUSE_HH
