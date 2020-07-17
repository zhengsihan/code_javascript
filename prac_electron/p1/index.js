var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var win = null;
app.on('ready', function(){
    win = new BrowserWindow({
        webPreferences: { nodeIntegration: true}
    });
    win.loadFile('index.html');
    win.on('closed', function(){
        win = null
    });
})
app.on('window-all-closed', function(){
    app.quit();
});
let { ipcMain } = require('electron')
ipcMain.on('msg_render2main', (event, param1, param2) => {
    console.log(param1);
    console.log(param2);
    console.log(event.sender);
});