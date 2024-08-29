import { Typography, Box } from "@mui/material";
import { useContext } from "react";
import { XDIFileContext } from "../contexts/XDIFileContext";

export default function ReviewTextView() {
  const xdi = useContext(XDIFileContext);

  return (
    <Box>
      <Typography
        sx={{ whiteSpace: "pre-line", overflow: "scroll", maxHeight: "20em" }}
      >
        {xdi.xdiFile === null ? "" : xdi.xdiFile.rawText()}
      </Typography>
    </Box>
  );
}
