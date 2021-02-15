import { ipcRenderer, contextBridge, IpcRenderer, remote, Remote } from 'electron';
import log from 'electron-log';

declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
      remote: Remote;
    }
  }
  interface Window {
    ipcRenderer: IpcRenderer;
    remote: Remote;
    log: log.LogFunctions;
  }
}

process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer;
  global.remote = remote;
  window.log = log.functions;
});