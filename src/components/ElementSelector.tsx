import SimplePeriodicTable from "./PeriodicTable";
import { Popover } from "@mui/material";
import { Stack, Button } from "@mui/material";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

import { FormControl, InputLabel } from "@mui/material";

function ElementSelector(props: {
  availableElements: Set<string>;
  selectedElement: string;
  setSelectedElement: React.Dispatch<string>;
}) {
  const elements = props.availableElements;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const size = isMatch ? 30 : 55;

  return (
    <Stack direction="row" spacing={2}>
      <FormControl>
        <InputLabel id="Element">Element</InputLabel>
        <Select
          sx={{ minWidth: 150 }}
          labelId="Element"
          id="Element"
          value={props.selectedElement}
          label="Element"
          onChange={(e) => props.setSelectedElement(e.target.value)}
        >
          <MenuItem value={"all"}>All Elements</MenuItem>
          {[...elements].map((x, y) => (
            <MenuItem key={y} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        aria-describedby={id}
        variant="outlined"
        sx={{ textTransform: "none" }}
        onClick={handleClick}
      >
        Periodic Table
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <SimplePeriodicTable
          availableElements={props.availableElements}
          onClickElement={(el) => {
            if (props.availableElements.has(el)) {
              props.setSelectedElement(el);
            }
            setAnchorEl(null);
          }}
          elementSize={size}
        />
      </Popover>
    </Stack>
  );
}

export default ElementSelector;
