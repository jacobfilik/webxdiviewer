import { JSX, useState, useEffect } from "react";
import { XASStandard } from "./models";
import StandardMetadataCard from "./StandardMetadataCard";
import axios from "axios";

import Stack from "@mui/material/Stack";

import { Element } from "./models";

import ElementSelector from "./ElementSelector";
import StandardsTableView from "./StandardsTableView";

const standards_url = "/api/standards";

const nResults = 7;

function StandardsTable(props: {
  standards: XASStandard[];
  elements: Element[];
  setStandards: (standards: XASStandard[]) => void;
  updatePlot: (id: number) => void;
}): JSX.Element {
  const [selectedStandard, setSelectedStandard] = useState<XASStandard>();
  const [selectedElement, setSelectedElement] = useState<number>(0);
  const [current, setCurrent] = useState<string | null>(null);
  const [prevNext, setPrevNext] = useState<string[] | null>(null);

  const setStandards = props.setStandards;
  const elements = props.elements;
  useEffect(() => {
    const get_req = (z: number, cursor: string | null) => {
      let url = standards_url;

      let symbol = null;

      if (z > 0 && z <= elements.length) {
        symbol = elements[z - 1].symbol;
      }

      if (symbol != null) {
        url =
          standards_url + "?element=" + symbol + "&size=" + String(nResults);
      } else {
        url = url + "?size=" + String(nResults);
      }

      if (cursor) {
        url = url + "&cursor=" + cursor;
      }

      axios.get(url).then((response) => {
        const output: XASStandard[] = response.data.items as XASStandard[];
        setPrevNext([response.data.previous_page, response.data.next_page]);
        setStandards(output);
      });
    };
    get_req(selectedElement, current);
  }, [selectedElement, current, setStandards, elements]);

  const stds: (XASStandard | null)[] = [null];

  if (stds.length < nResults) {
    while (stds.length < nResults) {
      stds.push(null);
    }
  }

  return (
    <Stack spacing={2}>
      <ElementSelector
        elements={elements}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />
      <StandardsTableView
        standards={props.standards}
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