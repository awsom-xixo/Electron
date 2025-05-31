# Electron
 Este é um repositório pessoal onde estou aprendendo a criar aplicações com Electron.

## O que é Electron?

Electron é um framework que permite criar aplicações desktop multiplataforma utilizando tecnologias web como HTML, CSS e JavaScript. Ele combina o Chromium (motor do navegador) com o Node.js, possibilitando que aplicações tenham acesso tanto à interface web quanto a recursos do sistema operacional. Grandes aplicativos como Visual Studio Code e Discord são exemplos de softwares construídos com Electron.

## Como Funciona?

O Electron funciona separando a aplicação em três camadas principais:

- **Main Process (`main.js`)**: Responsável por controlar o ciclo de vida do aplicativo, criar janelas e gerenciar eventos globais. Ele executa no Node.js e tem acesso total ao sistema operacional.
- **Preload Script (`preload.js`)**: Executado antes do carregamento do HTML, serve como ponte segura entre o processo principal e o frontend. Expõe APIs seguras para o navegador usando `contextBridge`, evitando riscos de segurança.
- **Renderer Process (`index.html`, `renderer.js`)**: Responsável pela interface do usuário. Roda em um ambiente semelhante ao navegador, mas pode acessar funcionalidades expostas pelo preload. Manipula o DOM e interage com o usuário.

A comunicação entre essas camadas garante que a aplicação seja segura, mantendo o acesso ao sistema operacional restrito e controlado.

## Anotações

- **main.js**
    - Controla o ciclo de vida do app Electron.
    - Usa `BrowserWindow` para criar janelas.
    - O preload é definido para isolar o acesso ao Node.js, aumentando a segurança.
    - `nodeIntegration` deve ser `false` para maior segurança (está `true` para contornar um bug do Electron).
    - Eventos importantes: `app.whenReady()`, `app.on('activate')`, `app.on('window-all-closed')`.

- **preload.js**
    - Executa antes do HTML, permitindo expor APIs seguras ao frontend.
    - Usa `contextBridge.exposeInMainWorld` para criar uma interface segura (`window.electronAPI`).
    - Permite acessar informações do sistema e criar arquivos sem expor todo o Node.js ao frontend.

- **renderer.js**
    - Manipula o DOM e interage com a API exposta pelo preload.
    - Poderia ser feito em uma tag script, já que a window.electronAPI é global. 

- **index.html**
    - Estrutura básica da interface.
    - Botão para criar arquivo TXT usando a API do preload.
    - Mostra informações do sistema operacional, Node, Chrome e Electron.

## ATENÇÃO

### Sobre o `nodeIntegration`

⚠️ **Atenção:** Definir `nodeIntegration` como `true` em aplicações Electron permite que scripts renderizados no contexto da janela tenham acesso total às APIs do Node.js.

#### Porque não deixar `nodeIntegration: true`:

- **Aumento do risco de segurança:** Scripts maldosos na página podem acessar o sistema de arquivos, executar comandos do sistema operacional e comprometer dados sensíveis do usuário.
- **Quebra do isolamento entre front-end e back-end:** O isolamento entre a interface do usuário e a lógica de backend é perdido, dificultando a aplicação de boas práticas de segurança.