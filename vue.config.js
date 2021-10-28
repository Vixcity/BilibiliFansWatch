module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          target: "nsis",
        },
        nsis: {
          onclick: false,
          allowToChangeInsatllationDirectory: true,
        },
      },
      nodeIntegration: true,
    },
  },
};
