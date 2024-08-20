import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import XDIFile from './xdifile'
import XASChart from './XASChart'

const data_url = "https://raw.githubusercontent.com/XraySpectroscopy/XASDataLibrary/master/data/As/as2o3_100K_scan1.xdi";

function App() {

  const get_data = () => {
    axios.get(data_url).then((response) => {

      const file = response.data;
      const xdifile = XDIFile.parseFile(file);
      console.log(xdifile)
    
    });
  }

  return (
    <XASChart xasdata={null}
              showTrans={false}
              showFluor={false}
              setShowTrans={null}
              setShowFluor={null}
              setShowRef={null}
              contains={[false,false,false]}/>
  )
}

export default App
