const info = document.getElementById('info');
info.innerHTML = `
        Plataforma atual: <strong>${window.electronAPI.platform()}</strong> <br>
        Versão do Node: <strong>(v${window.electronAPI.node()})</strong> <br>
        Versão do Chrome: <strong>(v${window.electronAPI.chrome()})</strong> <br>
        Versão do Electron: <strong>(v${window.electronAPI.electron()})</strong>
        `

function escreverArquivo() {
    window.electronAPI.writeHello();
    alert('Arquivo hello.txt criado!');
};

const funcao = async () => {
    const resposta = await window.electronAPI.ping();
    console.log(resposta) // printa 'pong'
}

funcao();