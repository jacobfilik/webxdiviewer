import { useState, useContext } from "react";

import XASChart from "./XASChart.tsx";
import axios from "axios";
import StandardsTable from "./StandardsTable.tsx";

import { XASStandard, XASData, Element } from "./models.ts";
// import { MetadataContext } from "../contexts/MetadataContext.tsx";

import { Grid } from "@mui/material";
import XDIFile from "./xdifile.ts";

import { MetadataContext } from "./MetadataContext.tsx";

function StandardViewer() {
  // const [standards, setStandardsList] = useState<XASStandard[]>([]);

  const [xasdata, setXASData] = useState<XASData | null>(null);
  const [showTrans, setShowTrans] = useState(false);
  const [showFluor, setShowFluor] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [contains, setContains] = useState([false, false, false]);


  const  allStandards  = useContext(MetadataContext);

  const allElementSymbol = allStandards.map(s => s.element.symbol);
  const elementsSymbol = [...new Set(allElementSymbol)];
  const elements : Element[] = elementsSymbol.map((e) => ({symbol : e}));


  // const { elements } = useContext(MetadataContext);

  function getData() {
    return (id: string) => {
      axios.get("/webxdiviewer/xdidata/" + id).then((response) => {

        const xdi = XDIFile.parseFile(response.data)
        // const containsTrans = output != null && output.mutrans.length != 0;
        // const containsFluor = output != null && output.mufluor.length != 0;
        // const containsRef = output != null && output.murefer.length != 0;

        const containsTrans = true;
        const containsFluor = false;
        const containsRef = false;

        setShowTrans(containsTrans);
        setShowRef(containsRef);
        setShowFluor(containsFluor);
        setContains([containsTrans, containsFluor, containsRef]);

        const xasdata : XASData = {energy : xdi.data["energy"], mutrans : xdi.data["mutrans"], mufluor : null, murefer: null}

        setXASData(xasdata);
      });
    };
  }

  const onClick = getData();

  return (
    <Grid height="100%" container>
      <Grid item xs={5} padding={1}>
        <StandardsTable
          standards={allStandards}
          elements={elements}
          updatePlot={onClick}
          // setStandards={setStandardsList}
        />
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

export default StandardViewer;