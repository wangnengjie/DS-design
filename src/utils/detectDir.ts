import fs from "fs";

const detectDir = () => {
  if (!fs.existsSync("./result")) {
    fs.mkdirSync("./result");
  }
  if (!fs.existsSync("./cnf")) {
    fs.mkdirSync("./cnf");
  }
};

export default detectDir;
