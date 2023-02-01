const electron = require('electron');
const {ipcRenderer, dialog} = electron;
let textArea = document.querySelector('#textArea');
let btnEncrypted = document.querySelector('#btnEncrypted');
let btnDecrypted = document.querySelector('#btnDecrypted');
let btnGithub = document.querySelector('#btnGithub');
let btnClear = document.querySelector('#btnClear');
let btnSave = document.querySelector('#btnSave');

btnEncrypted.addEventListener('click', () => {
    if (textArea.value == '') {
        ipcRenderer.send('btn:Null');

    } else {
        ipcRenderer.send('btnEncrypted:click', textArea.value);

    }
});

btnDecrypted.addEventListener('click', () => {
    if (textArea.value == '') {
        ipcRenderer.send('btn:Null');
    } else {
        ipcRenderer.send('btnDecrypted:click', textArea.value);
    }
});

ipcRenderer.on('Encrypt', (err, dataEnc) => {

    document.querySelector('#textArea').value = dataEnc;
});

ipcRenderer.on('Decrpyt', (err, dataDec) => {
    console.log(dataDec);
    document.querySelector('#textArea').value = dataDec;
});

btnGithub.addEventListener('click', () => {
    electron.shell.openExternal('https://github.com/ViselnikAscet')
});

btnClear.addEventListener('click', () => {
    document.querySelector('#textArea').value = '';
});

btnSave.addEventListener('click', () => {
    if (textArea.value == '') {
        ipcRenderer.send('btn:Null');
    } else {
        ipcRenderer.send('btnSave:click', textArea.value);
    }
});

