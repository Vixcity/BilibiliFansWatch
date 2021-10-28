const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 300,
    // 透明背景
    transparent: true,
    // 隐藏顶部菜单
    frame: false,
    //可否缩放
    resizable: false,
    //可否移动
    // movable: false,
    webPreferences: {
      // 是否显示控制台
      // devTools: false,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  //  先运行yarn dev
  //  在运行yarn start
  //  加载localhost:3000
  win.loadURL(" http://localhost:3000/");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
