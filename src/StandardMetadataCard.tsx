import { XASStandard } from "../models";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
} from "@mui/material";

const data_url = "/api/data";

function StandardMetadataCard(props: { standard: XASStandard }) {
  const standard = props.standard;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          XAS Standard
        </Typography>
        <Typography variant="h5" component="div">
          {standard.sample_name}
        </Typography>
        <Typography variant="h6" component="div">
          {standard.sample_comp}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {standard.sample_prep}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          Measured at {standard.facility} on beamline {standard.beamline.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{standard.collection_date}</Typography>
        <Typography variant="body2">
          {standard.citation}
          <br />
          {standard.doi}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          href={data_url + "/" + String(standard.id) + "?format=xdi"}
          download={String(standard.id) + ".xdi"}
        >
          Download
        </Link>
      </CardActions>
    </Card>
  );
}

export default StandardMetadataCard;
