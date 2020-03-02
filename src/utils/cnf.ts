import { openSync, writeSync, closeSync } from "fs";

const writeCnf = (fileName: string, litSize: number, clauses: number[][]) => {
  const fd = openSync(`./cnf/${fileName}`, "w");
  writeSync(fd, `p cnf ${litSize} ${clauses.length}\n`);
  for (const cla of clauses) {
    writeSync(fd, cla.join(" ") + " 0\n");
  }
  closeSync(fd);
};

export { writeCnf };
