import fs from "fs";
import readline from "readline";
import nanoid from "nanoid";
import bindings from "bindings";
import writeRes from "./writeRes";

export interface SolveResult {
  state: number;
  lits: number[];
  time: number | null;
}

export interface Problem {
  id: string;
  filePath: string;
  litSize: number;
  clauseSize: number;
  resFile: string | null;
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
      litSize: 0,
      clauseSize: 0,
      resFile: null
    };
    console.log(filePath);
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
    this.cb(this.problemList);
    await this.solve(np);
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
    const resFunc = (async () => {
      return bindings("addon").satSolver(
        fs.readFileSync(p.filePath).toString()
      ) as SolveResult;
    })();

    const path = this.generatePath(p.filePath);
    const res = await resFunc;
    this.problemList.find(v => v.id === p.id).resFile = path;
    writeRes(path, res);
  }

  private generatePath(path: string): string {
    let arr = path.split("\\");
    arr = arr[arr.length - 1].split(".");
    arr[1] = "res";
    return "./result/" + arr.join(".");
  }
}

export default DpllCenter;
