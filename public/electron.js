const electron = require("electron");
const { app, BrowserWindow, ipcMain, globalShortcut } = electron;
const peocessElectron = electron.process;
const path = require("path");
const isDev = require("electron-is-dev");
const debug = require("electron-debug");
const { reportToServer } = require("./crashReport");
isDev && debug();
let mainWindow;

function somePromise() {
  return new Promise(resole => {
    setTimeout(() => {
      resole();
    }, 1000);
  });
}

function logError(error) {
  if (typeof error === "object") {
    if (error.message) {
      console.log("\nMessage: " + error.message);
    }
    if (error.stack) {
      console.log("\nStacktrace:");
      console.log("====================");
      console.log(error.stack);
      console.log(error.code);
    }
  } else {
    console.log("Argument is not an object", error);
  }
}
//set up crash report
electron.crashReporter.start({
  companyName: "Demo",
  productName: "my-electron-crasher",
  submitURL: "http://localhost:3001/crash-report",
  ignoreSystemCrashHandler: true,
  uploadToServer: true,
  autoSubmit: true
  // extra: {
  //   'key': 'en-US',
  //   'email': 'quangdung100194@gmail.com',
  //   'comments': 'Crash app!'
  // }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  // mainWindow.webContents.on('crashed', e => {
  //   console.log("crashed===>", e);
  //   app.relaunch();
  //   // app.quit()
  // });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
//crash app
ipcMain.on("crash-app", () => {
  let a = [];
  for (;;) {
    a.push("crash");
  }
});

//error by logic
ipcMain.on("error-by-logic", () => {
  let a;
  a.map(element => {
    return {};
  });
});

//error by logic
ipcMain.on("error-by-logic", () => {
  let a;
  a.map(element => {
    return {};
  });
});
//error by not responding
ipcMain.on("error-by-not-responding", () => {
  for (let i = 0; i < 1000000000; i++) {
    console.log(i);
  }
});
// Catch Exception
process.on("uncaughtException", function(error, origin) {
  console.error("uncaughtException");
  logError(error);
  console.log("origin====>", origin);
  reportToServer("http://localhost:3001/bugs", {
    error: error.stack
  });
});
process.on("unhandledRejection", (error, origin) => {
  console.error("unhandledRejection");
  logError(error);
  console.log("origin====>", origin);
});

app.on("renderer-process-crashed", function(event, webContents, killed) {
  console.log("renderer-process-crashed", event);
  console.log("webContents", webContents);
  console.log("killed", killed);
});
