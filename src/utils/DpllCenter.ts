import fs from "fs";
import readline from "readline";
import nanoid from "nanoid";

export interface SolveResult {
  state: number;
  lits: number[];
  time: number | null;
  resFile: string;
}

export interface Problem {
  id: string;
  filePath: string;
  litSize: number;
  clauseSize: number;
  result: SolveResult | null;
}

class DpllCenter {
  private problemList: Problem[] = [];
  cb: (p: Problem[]) => void = null;

  constructor(cb?: (p: Problem[]) => void) {
    this.cb = cb;
  }

  getList(): Problem[] {
    return this.problemList;
  }

  async addProblem(filePath: string): Promise<void> {
    const np: Problem = {
      filePath,
      id: nanoid(),
      result: null,
      litSize: 0,
      clauseSize: 0
    };

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const l of rl) {
      const v = l.split(" ");
      if (v[0] === "p") {
        np.litSize = Number.parseInt(v[2]);
        np.clauseSize = Number.parseInt(v[3]);
        break;
      }
    }
    rl.close();
    fileStream.close();

    this.problemList.push(np);
    this.solve(np);
    this.cb(this.problemList);
  }

  removeProblem(id: string): void {
    const index = this.problemList.findIndex(v => v.id === id);
    if (index != -1) {
      this.problemList.splice(index, 1);
      this.cb(this.problemList);
    }
  }

  private async solve(p: Problem): Promise<void> {
    // bindings.xxxx.....
    // this.problemList.find(v => v.id === p.id);
    // ipcMain.emit("update", this.problemList);
    this.cb(this.problemList);
  }
}

export default DpllCenter;
