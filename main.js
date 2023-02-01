const crypto = require('crypto');
const electron = require('electron');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain, nativeTheme, dialog } = electron;

const algorithm = 'aes-256-cbc';
const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';
let mainWindow;



app.on('ready', () => {
    mainWindow = new electron.BrowserWindow({
        webPreferences: {
            zoomFactor: 1.0,
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: false,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        }
    });
    nativeTheme.themeSource = 'dark'


    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));


    ipcMain.on('btnEncrypted:click', (err, data) => {
        const cipher = crypto.createCipher(algorithm, password);
        let encrypted = cipher.update(data, 'utf8', 'hex')
        encrypted += cipher.final('hex');
        mainWindow.webContents.send('Encrypt', encrypted);

    });

    ipcMain.on('btnDecrypted:click', (err, data) => {
        try {
            const decipher = crypto.createDecipher(algorithm, password)
            let decrypted = decipher.update(data, 'hex', 'utf8')
            decrypted += decipher.final('utf8')

            mainWindow.webContents.send('Decrpyt', decrypted);
        } catch {
            dialog.showMessageBox({
                type: 'Error',
                title: 'Warning',
                message: 'Please Enter Valid Value',

            });
        }
    });

    ipcMain.on('btnSave:click', (err, data) => {
        dialog.showSaveDialog({
            title: 'Select the File Path to save',
            defaultPath: path.join(__dirname, '../assets/sample.txt'),
            buttonLabel: 'Save',
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt', 'docx']
                },],
            properties: []
        }).then(file => {
            if (!file.canceled) {
                fs.writeFile(file.filePath.toString(),
                    data, function (err) {
                        if (err) throw err;
                    });
            }
        }).catch(err => {
            dialog.showMessageBox({
                type: 'Error',
                title: 'Warning',
                message: 'Save Error', err
            });
        });
    });

    ipcMain.on('btn:Null', (err) => {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Warning',
            message: 'Please Do Not Enter Null Value',
        });
    });

    mainWindow.on('closed', () => {
        app.quit();
    }
    )
});
