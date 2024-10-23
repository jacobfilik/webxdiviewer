import { useState, useContext } from "react";

import axios from "axios";
import MetadataStack from "./MetadataStack.tsx";

import { Grid } from "@mui/material";
import XDIFile from "../xdifile.ts";

import { MetadataContext } from "../contexts/MetadataContext.tsx";
import { XDIFileProvider } from "../contexts/XDIFileContext.tsx";
import XDIChart from "./XDIChart.tsx";

function ViewPage() {
  const [xdiFile, setXDIFile] = useState<XDIFile | null>(null);

  const allStandards = useContext(MetadataContext);

  function getData() {
    return (id: string) => {
      axios.get("/webxdiviewer/xdidata/" + id).then((response) => {
        const xdi = XDIFile.parseFile(response.data, id);
        setXDIFile(xdi);
      });
    };
  }

  const onClick = getData();

  return (
    <XDIFileProvider value={{ xdiFile: xdiFile, setXDIFile: setXDIFile }}>
      <Grid height="100%" container>
        <Grid item lg={5} md={12} padding={1}>
          <MetadataStack standards={allStandards} updatePlot={onClick} />
        </Grid>
        <Grid item height="100%" lg={7} md={12} padding={1}>
          <XDIChart />
        </Grid>
      </Grid>
    </XDIFileProvider>
  );
}

export default ViewPage;
