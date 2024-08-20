
import { TableContainer, TableHead, TableRow, TableCell, Table, Paper, TableBody, Stack, Button } from "@mui/material"

import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";
import { useState } from "react";

import { XASStandard, AdminXASStandard } from "../models";


const nResults = 7;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd):not(:hover):not(.activeclicked)": {
      backgroundColor: theme.palette.action.selected,
    },
  
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
function StandardMetadata(props: {
    key: number;
    xasstandard: XASStandard | null;
    selected: AdminXASStandard | XASStandard | undefined;
    updatePlot: React.Dispatch<XASStandard>;
    selectedRow: number;
    setSelectedRow: React.Dispatch<React.SetStateAction<number>>;
  }): JSX.Element {
    const className = props.xasstandard === props.selected ? "activeclicked" : "";
  
    return (
      <StyledTableRow
        onClick={() => {
          props.setSelectedRow(props.key);
          props.updatePlot(props.xasstandard!);
        }}
        key={props.key}
        className={className}
        hover={true}
        selected={props.selectedRow === props.key}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <StyledTableCell align="right">
          {props.xasstandard?.element.symbol ?? "\xa0"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {props.xasstandard?.edge.name ?? ""}
        </StyledTableCell>
        <StyledTableCell align="right">
          {props.xasstandard?.sample_name ?? ""}
        </StyledTableCell>
        <StyledTableCell align="right">
          {props.xasstandard?.sample_prep ?? ""}
        </StyledTableCell>
        <StyledTableCell align="right">
          {props.xasstandard?.beamline.name ?? ""}
        </StyledTableCell>
      </StyledTableRow>
    );
  }

export default function StandardsTableView(props : {
    standards : XASStandard[];
    updatePlot : (id: number) => void;
    selectedStandard: XASStandard | undefined;
    setSelectedStandard : (x: XASStandard | AdminXASStandard | undefined)  => void;
    setCurrent: (cursor : string | null) => void;
    prevNext: string[] | null}) {

    const [selectedRow, setSelectedRow] = useState(-1);

    const nextPage = () => {
        props.setCurrent(props.prevNext == null ? null : props.prevNext[1]);
      };
    
      const prevPage = () => {
        props.setCurrent(props.prevNext == null ? null : props.prevNext[0]);
      };

    const clickStandard = (standard: XASStandard) => {
        props.updatePlot(standard.id);
       props.setSelectedStandard(standard);
      };

      const stds: (XASStandard | null)[] = [...props.standards];

      if (props.standards.length < nResults) {
        while (stds.length < nResults) {
          stds.push(null);
        }
      }

    return(
        <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Element</TableCell>
              <TableCell align="right">Edge</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Prep</TableCell>
              <TableCell align="right">Beamline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stds.map((standard, key) =>
              StandardMetadata({
                key: key,
                xasstandard: standard,
                selected: props.selectedStandard,
                updatePlot: clickStandard,
                selectedRow: selectedRow,
                setSelectedRow: setSelectedRow,
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          disabled={props.prevNext == null || props.prevNext[0] == null}
          onClick={prevPage}
        >
          &lt;
        </Button>
        <Button
          variant="contained"
          disabled={props.prevNext == null || props.prevNext[1] == null}
          onClick={nextPage}
        >
          &gt;
        </Button>
      </Stack>
        </>
    )
}