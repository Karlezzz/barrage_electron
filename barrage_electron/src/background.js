import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  screen,
  session,
  nativeImage,
} = require('electron')


const path = require('path')
const fs = require('fs')
let mainWindow
let tray
let remindWindow
let barrageHistoryWindow = null


app.on('ready', async () => {
  session.defaultSession.loadExtension("C:/Users/Karle/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.6.1_0");
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    transparent: true,
    frame: false,
    center: true,
    alwaysOnTop: false,
    icon: path.join(__dirname, '../src/assets/my.png'),
    resizable: false,
    webPreferences: {
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    mainWindow.loadURL(`file://${__dirname}/index.html`)
  }
})

function getIpInfo() {
  const fileUrl = path.resolve(app.getAppPath(), '../assets/ipAddress.json')
  const fileDataJson = fs.readFileSync(fileUrl, 'utf-8')
  const fileData = JSON.parse(fileDataJson)
  const { ip, port } = fileData
  return {
    ip,
    port
  }
}

function getUserInfo() {
  const fileUrl = path.resolve(app.getAppPath(), '../assets/userInfo.json')
  const fileDataJson = fs.readFileSync(fileUrl, 'utf-8')
  const fileData = JSON.parse(fileDataJson)
  const { name, id } = fileData
  return {
    name,
    id
  }
}


ipcMain.on('closeNewWindow', () => {
  remindWindow.destroy()
  remindWindow = undefined
})

ipcMain.on('closeMainWindow', () => {
  app.exit()
})

ipcMain.on('newWindow', () => {
  createRemindWindow()
  mainWindow.minimize()
})

let historyMessage = null
ipcMain.on('openMessageHistory', (e, data) => {
  historyMessage = data
  createBarrageHistory()
})

ipcMain.on('messageHistoryComplete', () => {
  if (barrageHistoryWindow)
    barrageHistoryWindow.webContents.send('getAllVuexMsg', historyMessage)
  mainWindow.webContents.send('messageHistoryStatus', true)
})

ipcMain.on('closeMessageHistory', () => {
  barrageHistoryWindow.destroy()
  barrageHistoryWindow = null
  mainWindow.webContents.send('messageHistoryStatus', false)
})


ipcMain.handle('getIpInfo', (event, data) => {
  const fileUrl = path.resolve(app.getAppPath(), '../assets/ipAddress.json')
  fs.writeFileSync(fileUrl, JSON.stringify(data, null, "\t"), 'utf-8')
})

ipcMain.handle('reqInfo', (event, data) => {
  const { ip, port } = getIpInfo()
  const { name, id } = getUserInfo()
  mainWindow.webContents.send('sendIpInfo', { ip, port })
  mainWindow.webContents.send('sendUserInfo', { name, id })
})

app.whenReady().then(() => {
  setTray()
  // createBarrageHistory()
})

ipcMain.on('sendVuexMsg', (e, data) => {
  if (remindWindow != undefined) remindWindow.webContents.send('getVuexMsg', data)
  if (barrageHistoryWindow) barrageHistoryWindow.webContents.send('getVuexMsg', data)
})

function setTray() {
  tray = new Tray(
    nativeImage.createFromPath(path.join(app.getAppPath(), '../assets/my.png'))
  )
  tray.setToolTip('Barrage')
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Open Barrage',
        click: () => {
          createRemindWindow()
          mainWindow.webContents.send('hasOpenBarrage')
          mainWindow.minimize()
        },
      },
      {
        label: 'Close Barrage',
        click: () => {
          remindWindow.destroy()
          remindWindow = undefined
          mainWindow.show()
          mainWindow.webContents.send('hasCloseBarrage')
        },
      },
      {
        label: 'Quit',
        click: () => app.exit(),
      },
    ])
    tray.popUpContextMenu(menuConfig)
  })
}

async function createRemindWindow() {
  remindWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height / 2,
    transparent: true,
    frame: false,
    toolbar: true,
    resizable: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    movable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  remindWindow.setIgnoreMouseEvents(true)
  remindWindow.setAlwaysOnTop(true)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    remindWindow.loadURL(
      process.env.WEBPACK_DEV_SERVER_URL + '/public/danmu.html'
    )
  } else {
    createProtocol('app')
    remindWindow.loadURL(`file://${__dirname}/danmu.html`)
  }
}

async function createBarrageHistory() {
  barrageHistoryWindow = new BrowserWindow({
    width: 200,
    height: 300,
    x: 0,
    y: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      webSecurity: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  // barrageHistoryWindow.setIgnoreMouseEvents(true)
  barrageHistoryWindow.setAlwaysOnTop(true)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    barrageHistoryWindow.loadURL(
      process.env.WEBPACK_DEV_SERVER_URL + '/public/danmuHistory.html'
    )
    // barrageHistoryWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    barrageHistoryWindow.loadURL(`file://${__dirname}/danmuHistory.html`)
  }
}
