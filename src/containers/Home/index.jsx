import React from "react";
import { crashWithWhileScreen } from "../../scripts/crashWithWhileScreen";
const electron = window.require("electron");
const { ipcRenderer, remote } = electron;
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
export default function Home() {
  const handleCrashApp = () => {
    ipcRenderer.send("crash-app");
  };
  const handleErrorByLogicMain = () => {
    ipcRenderer.send("error-by-logic");
    // for (let i = 0; i < 100000; i++) {
    //   console.log(i);
    // }
  };
  const handleNotResponding = () => {
    ipcRenderer.send("error-by-not-responding");
    // for (let i = 0; i < 100000; i++) {
    //   console.log(i);
    // }
  };

  const handleErrorByLogicRenderer = () => {
    let a;
    a.map(element => {
      return {};
    });
  };
  const handleRendererCrash = () => {
    let a = [];
    for (;;) {
      a.push("crash");
    }
  };

  const handleLoopInfinity = () => {
    let arr = [];
    for (let i = 0; i < 1000000000; i++) {
      arr.push("crash");
    }
    console.log(arr);
  };
  return (
    <div>
      <button onClick={handleCrashApp}>Crash App</button>
      <button onClick={handleErrorByLogicMain}>
        Error By Logic On Main Process
      </button>
      <button onClick={handleNotResponding}>Not Responding</button>

      <button onClick={handleErrorByLogicRenderer}>
        Error By NULL OR UNDIFINE On Renderer Process
      </button>
      <button onClick={handleRendererCrash}>Renderer Crash</button>
      <button onClick={handleLoopInfinity}>Loop Infinity</button>
    </div>
  );
}
