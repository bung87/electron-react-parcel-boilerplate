import { app, autoUpdater, shell, MenuItemConstructorOptions } from 'electron';
import log from 'electron-log';

// https://github.com/electron/electron/blob/master/docs/fiddles/menus/customize-menus/main.js

export const template: MenuItemConstructorOptions[] = [
  {
    role: 'editMenu',
    // label: 'Edit',
    // submenu: [
    //   { role: 'undo' },
    //   { role: 'redo' },
    //   { type: 'separator' },
    //   { role: 'cut' },
    //   { role: 'copy' },
    //   { role: 'paste' },
    //   { role: 'pasteAndMatchStyle' },
    //   { role: 'delete' },
    //   { role: 'selectAll' },
    // ],
  },
  {
    role: 'viewMenu',
    // label: 'View',
    // submenu: [
    //   { role: 'reload' },
    //   { role: 'forceReload' },
    //   // { role: 'toggleDevTools' },
    //   { type: 'separator' },
    //   { role: 'resetZoom' },
    //   { role: 'zoomIn' },
    //   { role: 'zoomOut' },
    //   { type: 'separator' },
    //   { role: 'togglefullscreen' },
    // ],
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell.openExternal('https://electron.atom.io');
        },
      },
      // {
      //   label: 'View log',
      //   click() {
      //     const filePath = log.transports.file.getFile().path;
      //     shell.openExternal(`file://${filePath}`);
      //   }
      // }
    ],
  },
];

if (process.platform === 'darwin') {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        // label: `About ${name}`,
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: 'Service',
        role: 'services',
        submenu: [],
      },
      {
        type: 'separator',
      },
      {
        // label: `Hide ${name}`,
        role: 'hide',
      },
      {
        role: 'hideOthers',
      },
      {
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        role: 'quit',
      },
    ],
  });

  // bring all to front
  (template[3].submenu as MenuItemConstructorOptions[]).push(
    {
      type: 'separator',
    },
    {
      role: 'front',
    },
  );

  addUpdateMenuItems(template[0].submenu, 1);
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu;
  addUpdateMenuItems(helpMenu, 0);
}

function addUpdateMenuItems(items, position) {
  if (process.mas) return;

  const version = app.getVersion();
  const updateItems: MenuItemConstructorOptions[] = [
    {
      label: `Version ${version}`,
      enabled: false,
    },
    {
      label: 'checking for updates',
      enabled: false,
      // key: 'checkingForUpdate'
    },
    {
      label: 'check for updates',
      visible: false,
      // key: 'checkForUpdate',
      click() {
        autoUpdater.checkForUpdates();
      },
    },
    {
      label: 'restart and install the update',
      enabled: true,
      // key: 'restartToUpdate',
      visible: false,
      click() {
        autoUpdater.quitAndInstall();
      },
    },
  ];

  items.splice( position, 0,...updateItems);
}
