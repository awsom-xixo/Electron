// Importando dois módulos do Electron
// app controla o ciclo de vida do aplicativo
// BrowserWindow cria janelas do app
const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');


// A função createWindow carrega uma janela web dentro do aplicativo
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),    // Define o caminho para o script do preload
            contextIsolation: true,                         // Mantém o preload isolado do JS do navegador (mais seguro)
            nodeIntegration: true                           // Desliga o Node do HTML por segurança
        }

    })

    win.loadFile('index.html');
}

// Quando o aplicativo estiver pronto, cria a janela
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()


    // No macOS, os apps costumam continuar ativos mesmo com todas as janelas fechadas
    // Então, ativar o app quando nenhuma janela estiver aberta abrirá uma nova.

    // Quando o app estiver ativo e nenhuma janela estiver aberta, cria uma nova.

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed'), () => {
    // Se o usuário fechar todas as janelas, o aplicativo será fechado
    if (process.platform !== 'darwin') { //darwin é macOS, enquanto win32 é Windows e linux é Linux
        app.quit();
    }
}

