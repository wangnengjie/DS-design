import { createWriteStream } from "fs";

const writeCnf = (fileName: string, litSize: number, clauses: number[][]) => {
  const writeFile = createWriteStream(`./cnf/${fileName}`);
  writeFile.write(`p cnf ${litSize} ${clauses.length}\n`);
  for (const cla of clauses) {
    writeFile.write(cla.join(" ") + " 0\n");
  }
  writeFile.close();
};

export { writeCnf };
