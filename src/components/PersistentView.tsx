import { useState, useContext } from "react";

import axios from "axios";
import MetadataTab from "./MetadataTab.tsx";

import { Grid, Typography } from "@mui/material";
import XDIFile from "../xdifile.ts";

import { XDIFileProvider } from "../contexts/XDIFileContext.tsx";
import XDIChart from "./XDIChart.tsx";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { MetadataContext } from "../contexts/MetadataContext.tsx";

function PersistentView() {
  const location = useLocation();
  const id = location.pathname.slice(5);

  const [xdiFile, setXDIFile] = useState<XDIFile | null>(null);
  const allStandards = useContext(MetadataContext);

  const standard = allStandards.find((f) => f.location === id);

  useEffect(() => {
    axios.get("/webxdiviewer/xdidata/" + id).then((response) => {
      let xdi = null;
      try {
        xdi = XDIFile.parseFile(response.data, id);
      } catch {
        console.log("Could not read {}", focus);
      }

      setXDIFile(xdi);
    });
  }, [id]);

  // const onClick = getData();

  return (
    <XDIFileProvider
      value={{
        xdiFile: xdiFile,
        setXDIFile: setXDIFile,
        comparisonFiles: [],
        setComparisonFiles: () => {},
      }}
    >
      <Grid height="100%" container>
        <Grid item lg={5} md={12} padding={1}>
          {standard ? (
            <MetadataTab
              standard={standard}
              showDownload={true}
              showCompare={false}
            />
          ) : (
            <Typography> Could not find {id} </Typography>
          )}
        </Grid>
        <Grid item height="100%" lg={7} md={12} padding={1}>
          <XDIChart />
        </Grid>
      </Grid>
    </XDIFileProvider>
  );
}
export default PersistentView;
