import { XASStandard } from "../models";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Link,
  Stack,
} from "@mui/material";

function StandardMetadataCard(props: {
  standard: XASStandard;
  showDownload: boolean;
}) {
  const standard = props.standard;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          XAS Metadata
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
          Measured at {standard.facility?.name} on beamline{" "}
          {standard.beamline.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{standard.start_time}</Typography>
      </CardContent>
      {props.showDownload && (
        <CardActions>
          <Stack>
            <Link
              href={"/webxdiviewer/xdidata/" + String(standard.location)}
              download={String(standard.id) + ".xdi"}
            >
              Download XDI
            </Link>
            <Link href={"/#/xdi/" + String(standard.location)}>
              Persistent Link
            </Link>
          </Stack>
        </CardActions>
      )}
    </Card>
  );
}

export default StandardMetadataCard;
