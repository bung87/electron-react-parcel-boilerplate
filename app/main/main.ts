import { serializeURL } from 'whatwg-url';
import { BrowserWindow, app, protocol, dialog, globalShortcut, Menu } from 'electron';
import { resolve } from 'app-root-path';
import log from 'electron-log';
import { template } from './menu';

const isDev = process.env.NODE_ENV === 'development';
// import { parseFeaturesString } from '@electron/internal/common/parse-features-string'
log.catchErrors({
  showDialog: false,
  onError(error, versions, submitIssue) {
    dialog
      .showMessageBox({
        title: 'An error occurred',
        message: error.message,
        detail: error.stack,
        type: 'error',
        buttons: ['Ignore', 'Report', 'Exit'],
      })
      .then((result) => {
        if (result.response === 1) {
          // submitIssue('https://github.com/my-acc/my-app/issues/new', {
          //   title: `Error report for ${versions.app}`,
          //   body: 'Error:\n```' + error.stack + '\n```\n' + `OS: ${versions.os}`
          // });
          return;
        }

        if (result.response === 2) {
          app.quit();
        }
      });
  },
});

app.on('ready', async () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  const protocolName = 'safe-file-protocol';

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '');
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      // Handle the error as needed
      console.error(error);
    }
  });

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true, // after electron 8.2.4 need this
      preload: resolve('app/main/.parcel/preload.js'),
      webSecurity: true,
    },
  });
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools();
    }
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  const devPath = 'http://localhost:1124';
  const prodPath = serializeURL({
    path: resolve('app/renderer/.parcel/production/index.html'),
    protocol: 'file:',
  });
  const root = isDev ? devPath : prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(root);
});

app.on('window-all-closed', app.quit);
