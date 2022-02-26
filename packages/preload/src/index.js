import { contextBridge, ipcRenderer } from "electron";

const apiKey = "electron";

if (import.meta.env.MODE !== "test") {
  contextBridge.exposeInMainWorld(apiKey, {
    versions: process.versions,
    openFolder: (...args) => ipcRenderer.invoke("openFolder", ...args),
  });
} else {
  window[apiKey] = api;
  // Need for Spectron tests
  window.electronRequire = require;
}
