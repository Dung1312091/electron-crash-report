import React from "react";
import { crashWithWhileScreen } from "../../scripts/crashWithWhileScreen";
const electron = window.require("electron");
const { ipcRenderer } = electron;
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
  const handleErrorByLogicRenderer = () => {
    let a;
    a.forEach(element => {
      console.log(element);
    });
  };
  const handleRendererCrash = () => {
    crashWithWhileScreen();
  };
  return (
    <div>
      <button onClick={handleCrashApp}>Crash App</button>
      <button onClick={handleErrorByLogicMain}>
        Error By Logic On Main Process
      </button>
      <button onClick={handleErrorByLogicRenderer}>
        Error By Logic On Renderer Process
      </button>
      <button onClick={handleRendererCrash}>Renderer Crash</button>
    </div>
  );
}
