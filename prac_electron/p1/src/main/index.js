var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var win = null;
app.on('ready', function(){
    win = new BrowserWindow({
        webPreferences: { nodeIntegration: true}
    });
    //electron本地启动
    //win.loadFile('index.html');

    //webpack修改
    let path = require('path');
    let URL = require('url');
    let url = '';
    if(process.env.NODE_ENV !== 'production'){
        url = 'http://localhost:' + process.env.ELECTRON_WEBPACK_WDS_PORT;
    }else{
        url = URL.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file'
        });
    }
    win.loadURL(url);

    win.on('closed', function(){
        win = null
    });
})
app.on('window-all-closed', function(){
    app.quit();
});
let { ipcMain } = require('electron')
ipcMain.on('msg_render2main', (event, param1, param2) => {
    win.webContents.send('msg_main2render', param1, param2);
});