import { JSX, useState } from "react";
import { XASStandard } from "../models";
import StandardMetadataCard from "./StandardMetadataCard";

import Stack from "@mui/material/Stack";

import ElementSelector from "./ElementSelector";
import StandardsTableView from "./StandardsTableView";

function MetadataStack(props: {
  standards: XASStandard[];
  updatePlot: (id: string) => void;
}): JSX.Element {
  const [selectedStandard, setSelectedStandard] = useState<XASStandard>();
  const [selectedElement, setSelectedElement] = useState<string>("all");
  const [offset, setOffset] = useState(0);

  const allElementSymbol = props.standards.map((s) => s.element.symbol);
  const elementsSymbol = new Set(allElementSymbol);

  let stds: XASStandard[] = [];

  if (selectedElement != "all") {
    stds = props.standards.filter((s) => s.element.symbol == selectedElement);
  } else {
    stds = props.standards;
  }

  const updateElement = (el: string) => {
    setSelectedElement(el);
    setOffset(0);
  };

  return (
    <Stack spacing={2}>
      <ElementSelector
        availableElements={elementsSymbol}
        selectedElement={selectedElement}
        setSelectedElement={updateElement}
      />
      <StandardsTableView
        standards={stds}
        updatePlot={props.updatePlot}
        selectedStandard={selectedStandard}
        setSelectedStandard={setSelectedStandard}
        offset={offset}
        setOffset={setOffset}
      />
      {selectedStandard && <StandardMetadataCard standard={selectedStandard} />}
    </Stack>
  );
}

export default MetadataStack;
