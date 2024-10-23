import { useContext } from "react";
import { XDIFileContext } from "../contexts/XDIFileContext";
import { XASChart } from "./XASChart";
import { XASData } from "../models";

function XDIChart() {
  const xdiFileState = useContext(XDIFileContext);

  let xasdata: XASData | null = null;

  if (xdiFileState.xdiFile != null) {
    const xdi = xdiFileState.xdiFile;

    const energy = xdi.energy();
    const mutrans = xdi.muTrans();
    const mufluor = xdi.muFluor();
    const murefer = xdi.muRefer();

    xasdata = {
      id: xdi.id,
      energy: energy,
      mutrans: mutrans,
      mufluor: mufluor,
      murefer: murefer,
    };
  }

  return <XASChart xasData={xasdata}></XASChart>;
}

export default XDIChart;
