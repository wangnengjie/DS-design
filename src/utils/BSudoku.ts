import nanoid from "nanoid";
import { execFile as _execFile } from "child_process";
import { promisify } from "util";
import { writeCnf } from "./cnf";
import { readRes } from "./res";
import detectDir from "./detectDir";

const execFile = promisify(_execFile);

class BSudoku {
  id = nanoid();
  rank: number;
  table: number[][];
  clauses: number[][] = [];
  count = 1; // next lit
  prefill: number[];

  public constructor(rank: number) {
    this.rank = rank;
    this.table = new Array<number[]>(rank + 1);
    for (let i = 1; i <= rank; i++) {
      this.table[i] = new Array<number>(rank + 1);
    }
    for (let i = 1; i <= rank; i++) {
      for (let j = 1; j <= rank; j++) {
        this.table[i][j] = this.count;
        this.count++;
      }
    }
  }

  private rule1() {
    for (let i = 1; i <= this.rank; i++) {
      for (let j = 1; j <= this.rank - 2; j++) {
        const t1: number[] = [];
        const t2: number[] = [];
        for (let k = j; k < j + 3; k++) {
          t1.push(this.table[i][k]);
          t2.push(this.table[k][i]);
        }
        this.clauses.push(
          t1,
          t1.map(s => -s),
          t2,
          t2.map(s => -s)
        );
      }
    }
  }

  private rule2() {
    const arr: number[][] = [];
    for (let i = 1; i <= this.rank; i++) {
      this.rule2Pick(i, 1, [[], []], arr);
    }
    arr.forEach(v => {
      this.clauses.push(
        v,
        v.map(e => -e)
      );
    });
  }

  private rule2Pick(
    index: number,
    start: number,
    tempResult: number[][],
    result: number[][]
  ) {
    const len = tempResult[0].length;
    for (let i = start; i <= this.rank / 2 + len; i++) {
      tempResult[0].push(this.table[index][i]);
      tempResult[1].push(this.table[i][index]);

      if (len + 1 === this.rank / 2 + 1) {
        result.push(tempResult[0].concat(), tempResult[1].concat());
      } else {
        this.rule2Pick(index, i + 1, tempResult, result);
      }
      tempResult[0].pop();
      tempResult[1].pop();
    }
  }

  private rule3() {
    for (let i = 1; i < this.rank; i++) {
      for (let j = i + 1; j <= this.rank; j++) {
        // row
        let tr: number[] = new Array(this.rank).fill(0).map(() => this.count++);
        let fa: number[] = new Array(this.rank).fill(0).map(() => this.count++);
        let tf: number[] = new Array(this.rank).fill(0).map(() => this.count++);
        let all = this.count++;
        this.clauses.push([all]);
        for (let k = 1; k <= this.rank; k++) {
          const t = k - 1;
          this.clauses.push([this.table[i][k], -tr[t]]);
          this.clauses.push([this.table[j][k], -tr[t]]);
          this.clauses.push([-this.table[i][k], -this.table[j][k], tr[t]]);

          this.clauses.push([-this.table[i][k], -fa[t]]);
          this.clauses.push([-this.table[j][k], -fa[t]]);
          this.clauses.push([this.table[i][k], this.table[j][k], fa[t]]);

          this.clauses.push([-tr[t], tf[t]]);
          this.clauses.push([-fa[t], tf[t]]);
          this.clauses.push([tr[t], fa[t], -tf[t]]);

          this.clauses.push([all, tf[t]]);
        }
        this.clauses.push(tf.map(e => -e).concat([-all]));

        // col
        tr = new Array(this.rank).fill(0).map(() => this.count++);
        fa = new Array(this.rank).fill(0).map(() => this.count++);
        tf = new Array(this.rank).fill(0).map(() => this.count++);
        all = this.count++;
        this.clauses.push([all]);
        for (let k = 1; k <= this.rank; k++) {
          const t = k - 1;
          this.clauses.push([this.table[k][i], -tr[t]]);
          this.clauses.push([this.table[k][j], -tr[t]]);
          this.clauses.push([-this.table[k][i], -this.table[k][j], tr[t]]);

          this.clauses.push([-this.table[k][i], -fa[t]]);
          this.clauses.push([-this.table[k][j], -fa[t]]);
          this.clauses.push([this.table[k][i], this.table[k][j], fa[t]]);

          this.clauses.push([-tr[t], tf[t]]);
          this.clauses.push([-fa[t], tf[t]]);
          this.clauses.push([tr[t], fa[t], -tf[t]]);

          this.clauses.push([all, tf[t]]);
        }
        this.clauses.push(tf.map(e => -e).concat([-all]));
      }
    }
  }

  public async generate() {
    let arr: number[] = [];
    if (process.env.npm_lifecycle_event) {
      const { stdout } = await execFile("addon/bin/DS_design.exe", [
        "--gen",
        this.rank.toString()
      ]);
      arr = stdout
        .trim()
        .split(" ")
        .map(e => Number.parseInt(e));
    } else {
      const { stdout } = await execFile(
        "resources/app/.webpack/DS_design.exe",
        ["--gen", this.rank.toString()]
      );
      arr = stdout
        .trim()
        .split(" ")
        .map(e => Number.parseInt(e));
    }
    this.prefill = arr;
    return arr;
  }

  public async solve(withoutPrefill: number[] = []) {
    detectDir();
    this.clauses = [];
    for (const v of this.prefill) {
      this.clauses.push([v]);
    }
    for (const v of withoutPrefill) {
      this.clauses.push([v]);
    }
    this.rule1();
    this.rule2();
    this.rule3();
    writeCnf(`${this.id}.cnf`, this.count - 1, this.clauses);
    if (process.env.npm_lifecycle_event) {
      await execFile("addon/bin/DS_design.exe", [
        "--solver",
        `./cnf/${this.id}.cnf`,
        `./result/${this.id}.res`
      ]);
    } else {
      await execFile("resources/app/.webpack/DS_design.exe", [
        "--solver",
        `./cnf/${this.id}.cnf`,
        `./result/${this.id}.res`
      ]);
    }
    return readRes(`./result/${this.id}.res`);
  }
}

export default BSudoku;
