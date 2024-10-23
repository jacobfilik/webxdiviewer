import XDIFile from "../xdifile";

import { useContext, useState } from "react";
import { XDIFileContext } from "../contexts/XDIFileContext";
import { XASStandard } from "../models";
import VisuallyHiddenInput from "./VisuallyHiddenInput";

import { Stack, Paper, Button, Typography, TextField } from "@mui/material";

import axios from "axios";

function UploadXDI(props: { setXASMetadata: (standard: XASStandard) => void }) {
  const [xdiURL, setXDIURL] = useState("");
  const [fileName, setFileName] = useState<string>("No file");

  const xdiContext = useContext(XDIFileContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(xdiURL).then((response) => {
      const xdi = XDIFile.parseFile(response.data, xdiURL);
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
      props.setXASMetadata(standard);
    });
  };

  const handleLocalFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const fileReader = new FileReader();

      fileReader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target != null && typeof e.target.result === "string") {
          let xdi: XDIFile;
          try {
            xdi = XDIFile.parseFile(e.target.result, "localfile");
            xdiContext.setXDIFile(xdi);

            const standard: XASStandard = {
              id: xdiURL,
              beamline: { name: xdi.beamline },
              edge: xdi.edge,
              element: xdi.element,
              sample: xdi.build_sample(),
              start_time: xdi.date,
            };
            props.setXASMetadata(standard);
          } catch (error) {
            console.log(error);
          }
        }
      };
      setFileName(event.target.files[0].name);
      fileReader.readAsText(event.target.files[0]);
    }
  };

  return (
    <Paper elevation={3} variant="outlined" square={false} sx={{ p: 2 }}>
      <Stack
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5">Upload XDI File</Typography>
        <Stack
          direction="row"
          component="form"
          onSubmit={handleSubmit}
          spacing={1}
        >
          <TextField
            margin="dense"
            sx={{ width: "75%" }}
            id="xdi-url"
            label="XDI file URL"
            variant="outlined"
            value={xdiURL}
            onChange={(e) => {
              setXDIURL(e.target.value);
            }}
          />
          <Button variant="contained" type="submit">
            Fetch
          </Button>
        </Stack>

        <Button
          variant="contained"
          role={undefined}
          tabIndex={-1}
          component="label"
        >
          Upload Local File
          <VisuallyHiddenInput
            type="file"
            name="file1"
            onChange={handleLocalFile}
          />
        </Button>

        <Typography
          noWrap
          sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}
        >
          {fileName}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default UploadXDI;
