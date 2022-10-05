try {require('electron-reloader')(module)} catch {}

import { app, BrowserWindow } from 'electron';
const path = require('path')

app.whenReady().then(() => {
  const win = new BrowserWindow();
  win.loadURL('http://127.0.0.1:8888');
  win.webContents.openDevTools();
});