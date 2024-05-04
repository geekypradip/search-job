import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { IJob } from "../redux/reducer/jobs-slicer";

export const JobCard: React.FC<IJob> = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="logoUrl" alt="company logo" src={props.logoUrl} />
        }
        title={props.companyName}
        subheader={props.jobRole}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.jobDetailsFromCompany}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};
