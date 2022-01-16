import { useEffect, useState } from 'react'
import { appWindow, UserAttentionType } from '@tauri-apps/api/window'
import { fs, shell, path } from '@tauri-apps/api'
import './App.css'

function minimize() {
  appWindow.minimize();
}

async function openExternalLink() {
  await shell.open('https://github.com');
}

function App() {
  const [count, setCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [homeDirectory, setHomeDirectory] = useState('');

  useEffect(async function () {
    let files = await fs.readDir(".");
    setFiles(files);

    let homeDir = await path.homeDir();
    setHomeDirectory(homeDir);
  }, []);

  return (
    <div className="App">
      <button onClick={minimize}>
        Minimize window
      </button>

      <h1>Files from the current directory:</h1>
      <ul>
      {files.map(function (file) {
        return <li key={file.path}>{file.name} - {file.path}</li>
      })}
      </ul>

      <button onClick={openExternalLink}>
        External link github.com
      </button>
      <div>
        What happens if we just add a link to:
        <a href="https://google.com">google.com</a>
      </div>

      <div>{homeDirectory}</div>
    </div>
  )
}

export default App
