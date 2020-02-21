#include <fstream>
#include <napi.h>

#include "src/core/final/Cnf.hh"
#include "src/core/final/Dpll.hh"

using namespace Napi;

Array test(std::string path, Env env);

Object SatSolver(const CallbackInfo &info) {
    Env env = info.Env();
    if (!info[0].IsString()) {
        TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return Array::New(env);
    }

    std::istringstream data(info[0].As<Napi::String>());
    final::Dpll dpll(final::cnfParser(data));
    auto &re = dpll.solve();

    auto &litSet = dpll.getCnf().litSet;
    Array array = Array::New(env, litSet.size());
    for (int i = 0; i < litSet.size(); i++) {
        array[i] = Number::New(env, litSet[i].state);
    }

    Object obj = Object::New(env);
    obj.Set(String::New(env, "state"), Number::New(env, re.first));
    obj.Set(String::New(env, "time"), Number::New(env, re.second));
    obj.Set(String::New(env, "lits"), array);
    return obj;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "satSolver"), Napi::Function::New(env, SatSolver));
    return exports;
}

NODE_API_MODULE(addon, Init)
