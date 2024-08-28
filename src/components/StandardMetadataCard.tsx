import { XASStandard } from "../models";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
} from "@mui/material";

function StandardMetadataCard(props: { standard: XASStandard }) {
  const standard = props.standard;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          XAS Standard
        </Typography>
        <Typography variant="h5" component="div">
          {standard.sample.name}
        </Typography>
        <Typography variant="h6" component="div">
          {standard.sample.formula}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {standard.sample.prep}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          Measured at {standard.facility?.name} on beamline {standard.beamline.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{standard.start_time}</Typography>
      </CardContent>
      <CardActions>
        <Link
          href={ "/webxdiviewer/xdidata/" + String(standard.location)}
          download={String(standard.id) + ".xdi"}
        >
          Download
        </Link>
      </CardActions>
    </Card>
  );
}

export default StandardMetadataCard;
