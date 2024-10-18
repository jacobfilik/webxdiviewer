import { Link } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

const env_repo_location = import.meta.env.VITE_SOME_KEY;

function WelcomePage() {

  const repo_location = env_repo_location ?? "examplerepo/xdifiles" 

  console.log(repo_location)
  return (
    <Container maxWidth="md" sx={{ alignSelf: "center", p: "24px" }}>
      <Typography variant="h4" padding="24px">
        Welcome to the XAS Data Viewer!
      </Typography>
      <Box>
        <Typography paragraph={true}>
          A prototype viewer for{" "}
          <Link to={"https://docs.xrayabsorption.org/xaslib/xdi.html"}>
            XDI files
          </Link>{" "}
          stored in a github repository. As part of the website build process,
          the XDI files are pulled in and indexed, giving simple static website
          to display open data. The website is currently pointing as a fork of
          the data in{" "}
          <Link to={"https://github.com/" + repo_location}>
            {repo_location}
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
