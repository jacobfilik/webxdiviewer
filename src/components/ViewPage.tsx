import { useState, useContext } from "react";

import XASChart from "./XASChart.tsx";
import axios from "axios";
import MetadataStack from "./MetadataStack.tsx";

import { XASData } from "../models.ts";

import { Grid } from "@mui/material";
import XDIFile from "../xdifile.ts";

import { MetadataContext } from "../contexts/MetadataContext.tsx";

function ViewPage() {
  const [xasdata, setXASData] = useState<XASData | null>(null);
  const [showTrans, setShowTrans] = useState(false);
  const [showFluor, setShowFluor] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [contains, setContains] = useState([false, false, false]);

  const allStandards = useContext(MetadataContext);

  function getData() {
    return (id: string) => {
      axios.get("/webxdiviewer/xdidata/" + id).then((response) => {
        const xdi = XDIFile.parseFile(response.data);

        const energy = xdi.energy();
        const mutrans = xdi.muTrans();
        const mufluor = xdi.muFluor();
        const murefer = xdi.muRefer();

        const containsTrans = !(mutrans === null);
        const containsFluor = !(mufluor === null);
        const containsRef = !(murefer === null);

        setShowTrans(containsTrans);
        setShowRef(containsRef);
        setShowFluor(containsFluor);
        setContains([containsTrans, containsFluor, containsRef]);

        const xasdata: XASData = {
          energy: energy,
          mutrans: mutrans,
          mufluor: mufluor,
          murefer: murefer,
        };

        setXASData(xasdata);
      });
    };
  }

  const onClick = getData();

  return (
    <Grid height="100%" container>
      <Grid item xs={5} padding={1}>
        <MetadataStack standards={allStandards} updatePlot={onClick} />
      </Grid>
      <Grid item height="100%" xs={7} padding={1}>
        <XASChart
          xasdata={xasdata}
          showTrans={showTrans}
          showFluor={showFluor}
          showRef={showRef}
          setShowTrans={setShowTrans}
          setShowFluor={setShowFluor}
          setShowRef={setShowRef}
          contains={contains}
        />
      </Grid>
    </Grid>
  );
}

export default ViewPage;
