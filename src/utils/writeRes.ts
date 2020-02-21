import fs from "fs";
import { SolveResult } from "./DpllCenter";

const writeRes: (path: string, res: SolveResult) => void = (path, res) => {
  const wr = fs.createWriteStream(path);
  switch (res.state) {
    case -1:
      wr.write("s 0\n");
      break;
    case 0:
      wr.write("s -1\n");
      break;
    case 1:
      wr.write("s 1\n");
      break;
    default:
      break;
  }
  if (res.state === 1) {
    let s = "v";
    for (let i = 1; i < res.lits.length; i++) {
      s += " " + (res.lits[i] > 0 ? i : -i);
    }
    s += "\n";
    wr.write(s);
  }
  wr.write(`t ${res.time}`);
  wr.close();
};

export default writeRes;
