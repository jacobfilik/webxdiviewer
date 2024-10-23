import { useContext } from "react";
import { XDIFileContext } from "../contexts/XDIFileContext";
import { XASChart } from "./XASChart";
import { XASData } from "../models";

function XDIChart() {
  const xdiFileState = useContext(XDIFileContext);

  let xasdata: XASData | null = null;
  let comparisonFiles: XASData[] = [];

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

    comparisonFiles = xdiFileState.comparisonFiles.map((f) => {
      return {
        id: f.id,
        energy: f.energy(),
        mutrans: f.muTrans(),
        mufluor: f.muFluor(),
        murefer: f.muRefer(),
      };
    });
  }

  return (
    <XASChart xasData={xasdata} comparisonFiles={comparisonFiles}></XASChart>
  );
}

export default XDIChart;
