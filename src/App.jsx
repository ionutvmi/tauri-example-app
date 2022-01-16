import { useEffect, useState } from 'react'
import { appWindow, UserAttentionType } from '@tauri-apps/api/window'
import { fs, shell, path, notification } from '@tauri-apps/api'
import './App.css'

import TitleBar from './TitleBar'

function minimize() {
  appWindow.minimize();
}

async function openExternalLink() {
  await shell.open('https://github.com');
}


async function sendNotification() {
  return;
  // currently this crashes the application, to be retried after the new release
  // of tauri tracked under https://github.com/tauri-apps/tauri/issues/917
  let permission = await notification.requestPermission();

  if (permission == 'granted') {
    notification.sendNotification("Hello there");
  }
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
      <TitleBar />

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
      <div>
        <button onClick={sendNotification}>Send notification</button>
      </div>
    </div>
  )
}

export default App
