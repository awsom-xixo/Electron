// Por segurança, o Electron não permite que o HTML use Node diretamente
// Então, para contornar isso, usamos scripts de pré-carregamento.
// Esse script rodará ANTES do HTML.

const os = require('os'); //Pega o sistema operacional atual.
const fs = require('fs');
const { contextBridge } = require('electron');

// expõe APIs para o navegador de forma segura
contextBridge.exposeInMainWorld('electronAPI', {
    
    // Essa função cria um "canal seguro" entre o preload e o HTML.
    // Ela cria uma variável global (window.electronAPI) acessível no navegador,
    // mas sem expor o Node inteiro (evita segurança ruim).

    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    platform: () => os.platform(),
    ping: () => ipcRenderer.invoke('ping'),

    writeHello: () => {
        fs.writeFileSync('hello.txt',
`Olá
Este arquivo foi gerado assim que você clicou no botão da página inicial do app.
Electron é impressionante.`, 'utf8'); //Cria um arquivo hello.txt com texto.
    }
});