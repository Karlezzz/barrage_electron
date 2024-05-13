const {
  defineConfig
} = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Barrage",
        appId: "electron.app",
        asar: false,
        extraResources: {
          from: './assets',
          to: 'assets'
        },
        nsis: {
          "oneClick": false, // 是否一键安装
          "allowElevation": true, // 允许请求提升。若为false，则用户必须使用提升的权限重新启动安装程序。
          "allowToChangeInstallationDirectory": true, //是否允许修改安装目录
          "installerIcon": "./src/assets/my2.ico",// 安装时图标
          "uninstallerIcon": "./src/assets/my2.ico",//卸载时图标
          "installerHeaderIcon": "./src/assets/my2.ico", // 安装时头部图标
          "createDesktopShortcut": true, // 是否创建桌面图标
          "createStartMenuShortcut": true,// 是否创建开始菜单图标
          "shortcutName": "all-electron", // 快捷方式名称
          "runAfterFinish": false,//是否安装完成后运行
        },
        win: {
          target: 'nsis',
          icon: './src/assets/my2.ico'
        },
        electronDownload: {
          mirror: "https://npm.taobao.org/mirrors/electron/"
        },
        extends: null
      }
    }
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    externals: {
      'electron': 'require("electron")'
    },
  },
  pages: {
    main: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html',
      title: 'Barrage Page'
    },
    remind: {
      entry: './src/barrage.js',
      template: './public/danmu.html',
      filename: 'danmu.html',
      title: 'Danmu page'
    },
    contentList: {
      entry: './src/barrageHistory.js',
      template: './public/danmuHistory.html',
      filename: 'danmuHistory.html',
      title: 'Danmu History'
    }
  },
})
