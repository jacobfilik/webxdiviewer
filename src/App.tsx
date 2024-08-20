import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import XDIFile from './xdifile'

const data_url = "https://raw.githubusercontent.com/XraySpectroscopy/XASDataLibrary/master/data/As/as2o3_100K_scan1.xdi";

function App() {
  const [count, setCount] = useState(0)

  const get_data = () => {
    axios.get(data_url).then((response) => {

      const file = response.data;
      const xdifile = XDIFile.parseFile(file);
      console.log(xdifile)
    
    });
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1);
          get_data()
        }
        }>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
