//
// Created by panda on 2020/2/28.
//
#include "GenCnf.hh"
GenCnf::GenCnf(int _rank) {
    rank = _rank;
    table = std::vector<std::vector<int>>(_rank + 1, std::vector<int>(_rank + 1));
    for (int i = 1; i <= rank; i++) {
        for (int j = 1; j <= rank; j++) {
            table[i][j] = count++;
        }
    }
}

auto GenCnf::generate() -> final::Cnf {
    rule1();
    rule2();
    rule3();
    return final::Cnf::cnfParser(count - 1, clauses);
}

auto GenCnf::rule1() -> void {
    for (int i = 1; i <= rank; i++) {
        for (int j = 1; j <= rank - 2; j++) {
            std::list<int> c1;
            std::list<int> c2;
            std::list<int> c3;
            std::list<int> c4;
            for (int k = j; k < j + 3; k++) {
                c1.push_back(table[i][k]);
                c2.push_back(-table[i][k]);
                c3.push_back(table[k][i]);
                c4.push_back(-table[k][i]);
            }
            clauses.push_back(std::move(c1));
            clauses.push_back(std::move(c2));
            clauses.push_back(std::move(c3));
            clauses.push_back(std::move(c4));
        }
    }
}

auto GenCnf::rule2() -> void {
    decltype(clauses) arr;
    std::vector<std::list<int>> temp(2);
    for (int i = 1; i <= rank; i++) {
        rule2helper(i, 1, temp, arr);
    }
    for (auto &cla : arr) {
        std::list<int> c1;
        for (auto &lit : cla) {
            c1.push_back(-lit);
        }
        clauses.push_back(std::move(cla));
        clauses.push_back(std::move(c1));
    }
}

auto GenCnf::rule2helper(int index, int start, std::vector<std::list<int>> &tempRes,
                         decltype(clauses) &result) -> void {
    std::list<int>::size_type len = tempRes[0].size();
    for (int i = start; i <= rank / 2 + len; i++) {
        tempRes[0].push_back(table[index][i]);
        tempRes[1].push_back(table[i][index]);
        if (len + 1 == rank / 2 + 1) {
            result.push_back(tempRes[0]);
            result.push_back(tempRes[1]);
        } else {
            rule2helper(index, i + 1, tempRes, result);
        }
        tempRes[0].pop_back();
        tempRes[1].pop_back();
    }
}

auto GenCnf::rule3() -> void {
    for (int i = 1; i < rank; i++) {
        for (int j = i + 1; j <= rank; j++) {
            // row
            std::vector<int> tr(rank);
            std::vector<int> fa(rank);
            std::vector<int> tf(rank);
            int all;
            for (int m = 0; m < rank; m++) {
                tr[m] = count++;
            }
            for (int m = 0; m < rank; m++) {
                fa[m] = count++;
            }
            for (int m = 0; m < rank; m++) {
                tf[m] = count++;
            }
            all = count++;
            clauses.push_back({all});
            for (int k = 1; k <= rank; k++) {
                int t = k - 1;
                clauses.push_back({table[i][k], -tr[t]});
                clauses.push_back({table[j][k], -tr[t]});
                clauses.push_back({-table[i][k], -table[j][k], tr[t]});

                clauses.push_back({-table[i][k], -fa[t]});
                clauses.push_back({-table[j][k], -fa[t]});
                clauses.push_back({table[i][k], table[j][k], fa[t]});

                clauses.push_back({-tr[t], tf[t]});
                clauses.push_back({-fa[t], tf[t]});
                clauses.push_back({tr[t], fa[t], -tf[t]});

                clauses.push_back({all, tf[t]});
            }
            std::list<int> temp(tf.begin(), tf.end());
            temp.push_back(all);
            for (auto &v : temp) {
                v = -v;
            }
            clauses.push_back(temp);

            // col
            for (int m = 0; m < rank; m++) {
                tr[m] = count++;
            }
            for (int m = 0; m < rank; m++) {
                fa[m] = count++;
            }
            for (int m = 0; m < rank; m++) {
                tf[m] = count++;
            }
            all = count++;
            clauses.push_back({all});
            for (int k = 1; k <= rank; k++) {
                int t = k - 1;
                clauses.push_back({table[k][i], -tr[t]});
                clauses.push_back({table[k][j], -tr[t]});
                clauses.push_back({-table[k][i], -table[k][j], tr[t]});

                clauses.push_back({-table[k][i], -fa[t]});
                clauses.push_back({-table[k][j], -fa[t]});
                clauses.push_back({table[k][i], table[k][j], fa[t]});

                clauses.push_back({-tr[t], tf[t]});
                clauses.push_back({-fa[t], tf[t]});
                clauses.push_back({tr[t], fa[t], -tf[t]});

                clauses.push_back({all, tf[t]});
            }
            temp = std::list<int>(tf.begin(), tf.end());
            temp.push_back(all);
            for (auto &v : temp) {
                v = -v;
            }
            clauses.push_back(temp);
        }
    }
}
