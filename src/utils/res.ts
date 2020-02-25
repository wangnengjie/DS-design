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

const deleteRes: (path: string) => void = path => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const readRes: (path: string) => SolveResult = path => {
  const re: SolveResult = { state: 0, time: 0, lits: [] };
  if (fs.existsSync(path)) {
    const data = fs
      .readFileSync(path)
      .toString()
      .split("\n");
    data.forEach(v => {
      const m = v.split(" ");
      if (m.length < 1) {
        return;
      }
      if (m[0] === "s") {
        re.state = Number.parseInt(m[1]);
      } else if (m[0] === "t") {
        re.time = Number.parseFloat(m[1]);
      } else if (m[0] === "v") {
        for (let i = 1; i < m.length; i++) {
          re.lits.push(Number.parseInt(m[i]));
        }
      }
    });
  }
  return re;
};

export { writeRes, deleteRes, readRes };
