import React from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;
export default function Home() {
  const handleCrashByLogic = () => {
    ipcRenderer.send("asynchronous-message", "ping");
    // for (let i = 0; i < 100000; i++) {
    //   console.log(i);
    // }
  };
  return (
    <div>
      <button onClick={handleCrashByLogic}>Crash by logic</button>
    </div>
  );
}
