import { useState } from "react";
import { XDIFileProvider } from "../contexts/XDIFileContext";
import XDIFile from "../xdifile";

import { Grid } from "@mui/material";
import XDIChart from "./XDIChart";
import UploadStack from "./UploadStack";

function XDIPage() {
  const [xdiFile, setXDIFile] = useState<XDIFile | null>(null);
  return (
    <XDIFileProvider value={{ xdiFile: xdiFile, setXDIFile: setXDIFile }}>
      <Grid height="100%" container>
        <Grid item lg={5} md={12} padding={1}>
          <UploadStack />
        </Grid>
        <Grid item height="100%" lg={7} md={12} padding={1}>
          <XDIChart />
        </Grid>
      </Grid>
    </XDIFileProvider>
  );
}

export default XDIPage;
