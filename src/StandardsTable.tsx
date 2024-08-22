import { JSX, useState, useEffect } from "react";
import { XASStandard } from "./models";
import StandardMetadataCard from "./StandardMetadataCard";
import axios from "axios";

import Stack from "@mui/material/Stack";

import { Element } from "./models";

import ElementSelector from "./ElementSelector";
import StandardsTableView from "./StandardsTableView";

const nResults = 7;

function StandardsTable(props: {
  standards: XASStandard[];
  elements: Element[];
  // setStandards: (standards: XASStandard[]) => void;
  updatePlot: (id: string) => void;
}): JSX.Element {
  const [selectedStandard, setSelectedStandard] = useState<XASStandard>();
  const [selectedElement, setSelectedElement] = useState<string>("all");
  const [current, setCurrent] = useState<number>(0);
  const [prevNext, setPrevNext] = useState<string[] | null>(null);


  let stds: XASStandard[] = [];

  console.log(selectedElement)

  if (selectedElement != "all") {
    stds = props.standards.filter((s) => (s.element.symbol == selectedElement))
  }  else {
    stds = props.standards
  }

  if (stds.length < nResults) {
    while (stds.length < nResults) {
      stds.push(null);
    }
  } else {
    stds = stds.slice(current,current+7)
  }

  return (
    <Stack spacing={2}>
      <ElementSelector
        elements={props.elements}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
      <StandardsTableView
        standards={stds}
        updatePlot={props.updatePlot}
        selectedStandard={selectedStandard}
        setSelectedStandard={setSelectedStandard}
        setCurrent={setCurrent}
        prevNext={prevNext}
      />
      {selectedStandard && <StandardMetadataCard standard={selectedStandard} />}
    </Stack>
  );
}

export default StandardsTable;