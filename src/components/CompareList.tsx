import {
  Button,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useContext } from "react";
import { XDIFileContext } from "../contexts/XDIFileContext";
import XDIFile from "../xdifile";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

import { tableCellClasses } from "@mui/material/TableCell";

import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd):not(:hover):not(.activeclicked)": {
    backgroundColor: theme.palette.action.selected,
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CompareMetadata(props: {
  key: number;
  xdiFile: XDIFile | null;
}): JSX.Element {
  //   const className = props.xasFile === props.selected ? "activeclicked" : "";

  return (
    <StyledTableRow
      key={props.key}
      hover={true}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <StyledTableCell align="left">
        {props.xdiFile?.element ?? "\xa0"}
      </StyledTableCell>
      <StyledTableCell align="center">
        {props.xdiFile?.edge ?? ""}
      </StyledTableCell>
      <StyledTableCell align="center">
        {props.xdiFile?.sample?.name ?? ""}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default function CompareList() {
  const xdiFileState = useContext(XDIFileContext);

  const store = () => {
    const current = xdiFileState.xdiFile;
    if (
      current != null &&
      !xdiFileState.comparisonFiles.some((f) => f.id == current?.id)
    ) {
      const filesSlice =
        xdiFileState.comparisonFiles.length >= 3
          ? xdiFileState.comparisonFiles.slice(1, 3)
          : xdiFileState.comparisonFiles;

      const files = [...filesSlice, current];
      xdiFileState.setComparisonFiles(files);
    }
  };

  const clear = () => {
    xdiFileState.setComparisonFiles([]);
  };

  return (
    <Box>
      <Button variant="contained" onClick={store}>
        Store Selected
      </Button>
      <Button variant="outlined" onClick={clear}>
        Clear All
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Element</TableCell>
              <TableCell align="center">Edge</TableCell>
              <TableCell align="center">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {xdiFileState.comparisonFiles.map((xdiFile, key) =>
              CompareMetadata({
                key: key,
                xdiFile: xdiFile,
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
