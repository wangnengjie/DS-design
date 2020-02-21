//
// Created by panda on 2020/2/9.
//

#include "Clause.hh"

namespace final {
auto Clause::getState(Literals &litSet) -> State {
    int count = 0;
    for (auto &it : lits) {
        State s = litSet[std::abs(it)].state;
        switch (s) {
        case unsatisfied:
            if (it < 0) {
                return satisfied;
            }
            break;
        case satisfied:
            if (it > 0) {
                return satisfied;
            }
            break;
        case unknown:
            count++;
            break;
        default:
            break;
        }
    }
    return count == 0 ? unsatisfied : (count == 1 ? unit : unknown);
}

auto Clause::assign(int v, Literals &litSet) -> std::pair<State, int> {
    int ptr1v = lits[ptr1];
    int ptr2v = lits[ptr2];
    if (std::abs(ptr1v) != std::abs(v) &&
        std::abs(ptr2v) != std::abs(v)) { // watched lit will not assigned or assign to 1
        return {unknown, 0};
    }
    if (ptr1v == v || ptr2v == v) {
        return {satisfied, 0};
    }
    bool update = false;
    if (ptr2v == -v) {
        std::swap(ptr1, ptr2);
        std::swap(ptr1v, ptr2v);
    } // make ptr1 should update
    for (unsigned int i = (ptr1 + 1) % lits.size(); !update && i != ptr1;
         i = (i + 1) % lits.size()) {
        if (i == ptr2) {
            continue;
        }
        int cv = lits[i];
        int abscv = std::abs(cv);
        switch (litSet[abscv].state) {
        case satisfied:
            if (cv > 0) {
                return {satisfied, 0};
            }
            break;
        case unsatisfied:
            if (cv < 0) {
                return {satisfied, 0};
            }
            break;
        case unknown:
            update = true;
            ptr1 = i;
            break;
        default:
            break;
        }
    }
    if (!update) {
        State s = litSet[std::abs(ptr2v)].state;
        if (s == unknown) {
            return {unit, ptr2v};
        }
        if ((s == satisfied && ptr2v < 0) || (s == unsatisfied && ptr2v > 0)) {
            return {unsatisfied, 0};
        }
    }
    return {unknown, 0};
}
} // namespace final