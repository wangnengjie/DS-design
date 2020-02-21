//
// Created by panda on 2020/2/1.
//

#ifndef CORE_ORIGIN_LITERAL_HH
#define CORE_ORIGIN_LITERAL_HH
#pragma once

namespace origin {
enum State { unsatisfied = -1, unknown, satisfied };
using lit = int;
struct Literal {
    State state;
};
} // namespace origin

#endif // CORE_ORIGIN_LITERAL_HH
