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
  devServer: {
    open: false,
    host: "0.0.0.0",
    proxy: {
      "/getIP": {
        target: "http://pv.sohu.com/cityjson",
        changeOrigin: true,
        pathRewrite: {
          "^/getIP": "",
        },
      },
      '/getUserIpInfo': {
        target: 'https://restapi.amap.com/v5/ip',
        changeOrigin: true,
        pathRewrite: {
            '^/getUserIpInfo': ''
        }
      },
      "/getWeatherInfo": {
        target:
          "https://devapi.qweather.com/v7/weather/3d?location=120.12,30.28&key=30fde3b33b5f4c7fb278e9f0b36c647a",
        changeOrigin: true,
        pathRewrite: {
          "^/getWeatherInfo": "",
        },
      },
      "/getNowWeather": {
        target:
          "https://devapi.qweather.com/v7/weather/now?location=120.12,30.28&key=30fde3b33b5f4c7fb278e9f0b36c647a",
        changeOrigin: true,
        pathRewrite: {
          "^/getNowWeather": "",
        },
      },
      "/getWeatherComfort":{
        target:
          "https://devapi.qweather.com/v7/indices/1d?type=0&location=120.12,30.28&key=30fde3b33b5f4c7fb278e9f0b36c647a",
        changeOrigin: true,
        pathRewrite: {
          "^/getWeatherComfort": "",
        },
      }
    },
  },
};
