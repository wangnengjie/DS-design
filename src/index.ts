import { app, BrowserWindow, ipcMain } from "electron";
import DpllCenter, { Problem } from "./utils/DpllCenter";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 525,
    width: 700,
    resizable: false,
    autoHideMenuBar: true,
    frame: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

const callback = (p: Problem[]) => {
  mainWindow.webContents.send("updateList", JSON.stringify(p));
};

const problemSet = new DpllCenter(callback);

ipcMain.on("closeWindow", (event, args) => {
  mainWindow.close();
});

ipcMain.on("addProblem", async (event, filePath: string) => {
  problemSet.addProblem(filePath);
});

ipcMain.on("removeProblem", (event, id: string) => {
  problemSet.removeProblem(id);
});

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
