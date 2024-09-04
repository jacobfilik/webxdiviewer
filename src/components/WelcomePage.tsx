import { Link } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

function WelcomePage() {
  return (
    <Container maxWidth="md" sx={{ alignSelf: "center" }}>
      <Typography variant="h5">Welcome to the XAS Data Viewer!</Typography>
      <Box>
        <Typography paragraph={true}>
          A prototype viewer for{" "}
          <Link to={"https://docs.xrayabsorption.org/xaslib/xdi.html"}>
            XDI files
          </Link>{" "}
          stored in a github repository. As part of the website build process,
          the XDI files are pulled in and indexed, giving simple static website
          to display open data. The website is currently pointing as a fork of
          the data in the{" "}
          <Link to={"https://github.com/XraySpectroscopy/XASDataLibrary"}>
            XASDataLibrary
          </Link>
          .
        </Typography>
        <Typography paragraph={true}>
          The database is open to <Link to={"view"}> search and download </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
}

export default WelcomePage;
