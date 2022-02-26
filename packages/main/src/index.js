import { join } from "path";
import { URL } from "url";

import { app, BrowserWindow, globalShortcut, dialog, ipcMain } from "electron";

const isSingleInstance = app.requestSingleInstanceLock();
const env = import.meta.env;

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

ipcMain.handle("openFolder", (event) => {
  const folderPath = openFolder();
  return folderPath;
});

let mainWindow = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    title: "Berry",
    titleBarStyle: "hiddenInset",
    show: false,
    webPreferences: {
      preload: join(__dirname, "../../preload/dist/index.cjs"),
      contextIsolation: env.MODE !== "test",
      enableRemoteModule: env.MODE === "test",
    },
    resizable: false,
    width: 1366,
    height: 800,
    movable: true,
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
    if (env.MODE === "development") {
      mainWindow?.webContents.openDevTools();
    }
  });

  mainWindow.on("close", () => {
    mainWindow = null;
  });

  const pageUrl =
    env.MODE === "development"
      ? env.VITE_DEV_SERVER_URL
      : new URL("../renderer/dist/index.html", "file://" + __dirname).toString();

  await mainWindow.loadURL(pageUrl);
};

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  } else {
    createWindow().catch((e) => console.error("Failed create window:", e));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    globalShortcut.register("Alt+CommandOrControl+W", () => {
      console.log("closed tab");
    });
  })
  .then(createWindow)
  .catch((e) => console.error("Failed create window:", e));

// Auto-updates
if (env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error("Failed check updates:", e));
}

const openFolder = () => {
  const folderPath = dialog.showOpenDialogSync(mainWindow, {
    properties: ["openDirectory"],
  });

  if (!folderPath) return "/Users/juw/Desktop/Notes";

  return folderPath;
};
