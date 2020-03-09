cmake_minimum_required(VERSION 3.15)
project(DS_design)

find_package(Threads)

set(CMAKE_CXX_STANDARD 20)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/bin)

add_executable(DS_design main.cc src/core/origin/Literal.hh src/core/origin/Clause.hh src/core/origin/Clause.cc src/core/origin/Cnf.cc src/core/origin/Cnf.hh src/core/origin/Dpll.cc src/core/origin/Dpll.hh src/core/origin/cnfparser.hh src/core/origin/cnfparser.cc src/core/final/Clause.cc src/core/final/Clause.hh src/core/final/Cnf.cc src/core/final/Cnf.hh src/core/final/Dpll.cc src/core/final/Dpll.hh src/writeRes.hh src/writeRes.cc src/sudoku/GenCnf.hh src/sudoku/GenCnf.cc src/sudoku/genSudoku.hh src/sudoku/genSudoku.cc)

target_link_libraries(DS_design ${CMAKE_THREAD_LIBS_INIT})