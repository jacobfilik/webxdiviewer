import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Checkbox } from "@mui/material";

import { NavLink } from "react-router-dom";

import { MdLightMode, MdDarkMode } from "react-icons/md";
import XASIcon from "./XASIcon";

export default function Header(props: {
  colorMode: string;
  toggleColorMode: () => void;
}) {
  const navitems = {
    Home: "/",
    Explore: "/view",
    Terms: "/terms",
  };

  return (
    <AppBar style={{ position: "static" }}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <Box>
            <XASIcon />
          </Box>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            XAS Data Viewer
          </Typography>
          <List component={Stack} direction="row">
            {Object.entries(navitems).map(([key, value]) => (
              <ListItem key={key}>
                <ListItemButton
                  component={NavLink}
                  to={value}
                  sx={{
                    "&.active": {
                      color: (theme) => theme.palette.text.secondary,
                    },
                  }}
                >
                  <ListItemText primary={key} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack direction="row" alignItems={"center"}>
          <Checkbox
            icon={<MdLightMode />}
            checkedIcon={<MdDarkMode />}
            checked={props.colorMode === "dark"}
            onChange={props.toggleColorMode}
          ></Checkbox>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
