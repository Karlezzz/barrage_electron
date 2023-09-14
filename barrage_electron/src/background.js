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
let mainWindow
let tray
let remindWindow

app.on('ready', async () => {
  session.defaultSession.loadExtension(
    'C:/Users/Karle/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_0'
  )
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
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

ipcMain.on('closeNewWindow', () => {
  remindWindow.destroy()
  remindWindow = undefined
})

ipcMain.on('closeMainWindow', () => {
  mainWindow.close()
})

ipcMain.on('newWindow', () => {
  createRemindWindow()
  mainWindow.minimize()
})

app.whenReady().then(() => {
  setTray()
})

ipcMain.on('sendVuexMsg', (e, data) => {
  if (remindWindow != undefined)
    remindWindow.webContents.send('getVuexMsg', data)
})

function setTray() {
  tray = new Tray(
    nativeImage.createFromPath(path.join(__dirname, '../src/assets/my.png'))
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
          remindWindow.close()
          remindWindow = undefined
          console.log(remindWindow)
          mainWindow.show()
          mainWindow.webContents.send('hasCloseBarrage')
        },
      },
      {
        label: 'Quit',
        click: () => app.quit(),
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
