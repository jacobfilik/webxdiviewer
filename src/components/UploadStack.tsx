import { Stack, TextField, Grid, Button, Typography } from "@mui/material";

import { useContext, useState } from "react";
import { XASStandard } from "../models";

import MetadataTab from "./MetadataTab";
import VisuallyHiddenInput from "./VisuallyHiddenInput";
import axios from "axios";
import XDIFile from "../xdifile";
import { XDIFileContext } from "../contexts/XDIFileContext";

function UploadStack() {
  const [xdiURL, setXDIURL] = useState("");
  const [xasMetadata, setXASMetadata] = useState<XASStandard | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const xdiContext = useContext(XDIFileContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(xdiURL).then((response) => {
      const xdi = XDIFile.parseFile(response.data);
      xdiContext.setXDIFile(xdi);

      const standard: XASStandard = {
        id: xdiURL,
        beamline: xdi.beamline,
        edge: xdi.edge,
        element: xdi.element,
        sample: xdi.sample,
        start_time: xdi.date,
      };

      setFileName(xdiURL);
      setXASMetadata(standard);
    });
  };

  const handleLocalFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const fileReader = new FileReader();

      fileReader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target != null && typeof e.target.result === "string") {
          let xdi: XDIFile;
          try {
            xdi = XDIFile.parseFile(e.target.result);
            xdiContext.setXDIFile(xdi);

            const standard: XASStandard = {
              id: xdiURL,
              beamline: xdi.beamline,
              edge: xdi.edge,
              element: xdi.element,
              sample: xdi.sample,
              start_time: xdi.date,
            };
            setXASMetadata(standard);
          } catch (error) {
            console.log("oops");
          }
        }
      };
      setFileName(event.target.files[0].name);
      fileReader.readAsText(event.target.files[0]);
    }
  };

  return (
    <Stack spacing={2}>
      <Grid component="form" container spacing={1} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            id="xdi-url"
            label="XDI file URL"
            variant="outlined"
            value={xdiURL}
            onChange={(e) => {
              setXDIURL(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button type="submit">Upload</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <Button
            variant="contained"
            role={undefined}
            tabIndex={-1}
            component="label"
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              name="file1"
              onChange={handleLocalFile}
            />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Typography>{fileName}</Typography>
        </Grid>
      </Grid>
      {xasMetadata && <MetadataTab standard={xasMetadata} />}
    </Stack>
  );
}

export default UploadStack;
