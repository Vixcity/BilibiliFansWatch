const { contextBridge } = require("electron");
// 在vue页面中引用window.$electron.titile，获得 'electron-vite-vue'
contextBridge.exposeInMainWorld("$electron", {
  title: "electron-vite-vue",
});
