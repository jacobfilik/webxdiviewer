// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import axios from 'axios'
// import './App.css'
// import XDIFile from './xdifile'
// import StandardViewer from './StandardViewer'



// function App() {

//   const get_data = () => {
//     axios.get(data_url).then((response) => {

//       const file = response.data;
//       const xdifile = XDIFile.parseFile(file);
//       console.log(xdifile)
    
//     });
//   }

//   return (
//     <StandardViewer/>
//   )
// }

// export default App



import StandardViewerMui from "./StandardViewer.tsx";


import { CssBaseline } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import { useState, useMemo } from "react";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const refs_url = "https://api.github.com/repos/jacobfilik/xasdatalibrary/git/refs"
const datablob_url = "https://api.github.com/repos/jacobfilik/xasdatalibrary/contents/data/As/as2o3_100K_scan1.xdi"
const tree_url = "https://api.github.com/repos/jacobfilik/xasdatalibrary/git/trees/51739a7?recursive=1"
const data_tree_url = "https://api.github.com/repos/jacobfilik/XASDataLibrary/git/trees/bebef6d5c617930f29a8cc5d0f9cbef9391297a9?recursive=1"

const data_url = "https://raw.githubusercontent.com/XraySpectroscopy/XASDataLibrary/master/data/As/as2o3_100K_scan1.xdi";


function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack height="100vh" width="100vw" spacing={1}>
      <StandardViewerMui />
      </Stack>
    </ThemeProvider>
  );
}

export default App;