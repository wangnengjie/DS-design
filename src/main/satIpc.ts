import DpllCenter, { Problem } from "../utils/DpllCenter";
import { ipcMain } from "electron";
import { mainWindow } from "./index";

const callback = (p: Problem[]) => {
  mainWindow.webContents.send("updateList", p);
};

const problemSet = new DpllCenter(callback);

ipcMain.on("addProblem", async (event, filePath: string) => {
  problemSet.addProblem(filePath);
});

ipcMain.on("removeProblem", (event, id: string) => {
  problemSet.removeProblem(id);
});

ipcMain.on("getProblems", () => {
  callback(problemSet.getList());
});
