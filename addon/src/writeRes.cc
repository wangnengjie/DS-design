//
// Created by panda on 2020/2/22.
//
#include "writeRes.hh"
namespace final {
auto writeRes(State s, double time, Literals &lits, std::string path) -> void {
    std::ofstream out(path, std::ios::out | std::ios::trunc);
    out.setf(std::ios::fixed);
    out.unsetf(std::ios::floatfield);
    switch (s) {
    case satisfied:
        out << "s 1" << std::endl;
        break;
    case unsatisfied:
        out << "s 0" << std::endl;
        break;
    case unknown:
        out << "s -1" << std::endl;
        break;
    default:
        break;
    }
    if (s == satisfied) {
        out << "v";
        for (int i = 1; i < lits.size(); i++) {
            out << " " << ((lits[i].state == satisfied) ? i : -i);
        }
        out << std::endl;
    }
    out << "t " << time << std::endl;
    out.close();
}
} // namespace final