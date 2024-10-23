import { Stack } from "@mui/material";

import { useState } from "react";
import { XASStandard } from "../models";

import MetadataTab from "./MetadataTab";
import UploadXDI from "./UploadXDI";

function UploadStack() {
  const [xasMetadata, setXASMetadata] = useState<XASStandard | null>(null);

  return (
    <Stack spacing={2}>
      <UploadXDI setXASMetadata={setXASMetadata} />
      {xasMetadata && (
        <MetadataTab
          standard={xasMetadata}
          showDownload={false}
          showCompare={false}
        />
      )}
    </Stack>
  );
}

export default UploadStack;
