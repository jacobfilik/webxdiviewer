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

import ViewPage from "./components/ViewPage.tsx";
import WelcomePage from "./components/WelcomePage.tsx";
import Header from "./components/Header.tsx";

import { CssBaseline } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import { useState, useMemo } from "react";
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MetadataProvider } from "./contexts/MetadataContext.tsx";
import { Routes, Route } from "react-router-dom";
import XDIPage from "./components/XDIPage.tsx";

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
        <Header colorMode={mode} toggleColorMode={colorMode.toggleColorMode} />
        <MetadataProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/view" element={<ViewPage />} />
            <Route path="/xdiviewer" element={<XDIPage />} />
          </Routes>
        </MetadataProvider>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
