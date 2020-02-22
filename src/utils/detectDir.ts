import fs from "fs";

const detectDir = () => {
  if (!fs.existsSync("./result")) {
    fs.mkdirSync("./result");
  }
};

export default detectDir;
