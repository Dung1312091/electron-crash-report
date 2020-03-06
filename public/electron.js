const electron = require("electron");
const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
} = electron;
const peocessElectron = electron.process;
const path = require("path");
const isDev = require("electron-is-dev");
const debug = require("electron-debug");
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
  if (typeof error === 'object') {
    if (error.message) {
      console.log('\nMessage: ' + error.message)
    }
    if (error.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(error.stack);
      console.log(error.code);
    }
  } else {
    console.log('Argument is not an object', error);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev ?
    "http://localhost:3000" :
    `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  const ret = globalShortcut.register("CommandOrControl+X", () => {
    console.log("CommandOrControl+X is pressed");
  });

  if (!ret) {
    console.log("registration failed");
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered("CommandOrControl+X"));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (peocessElectron.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("asynchronous-message", () => {
  // process.crash()
  // let a = null;
  // a.forEach(element => {
  //   console.log(element)
  // });
  // somePromise().then(res => {
  //   for (let i = 0; i < 1000000; i++) {
  //     console.log(i);
  //   }
  // });

  // throw new Error('Run out of time');
  console.log("aaaa")
});
electron.crashReporter.start({
  companyName: 'Demo',
  productName: 'my-electron-crasher',
  submitURL: 'http://localhost:3001/crash-report',
  // ignoreSystemCrashHandler: true,
  uploadToServer: true,
  autoSubmit: true,
  // extra: {
  //   'key': 'en-US',
  //   'email': 'quangdung100194@gmail.com',
  //   'comments': 'Crash app!'
  // }
})
// Catch Exception
process.on("uncaughtException", function (error, origin) {
  console.error("uncaughtException");
  logError(error);
  console.log("origin====>", origin);
  process.crash()

});
process.on("unhandledRejection", (error, origin) => {
  console.error("unhandledRejection");
  logError(error);
  console.log("origin====>", origin);
});