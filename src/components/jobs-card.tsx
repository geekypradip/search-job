import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IJob } from "../redux/reducer/jobs-slicer";

export const JobCard: React.FC<IJob> = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="logoUrl"
              alt="company logo"
              src={props.logoUrl}
            />
          }
          title={props.companyName}
          subheader={
            <>
              <Typography variant="body2">{props.jobRole}</Typography>
              <Typography variant="caption" color={"text.primary"}>
                {props.location}
              </Typography>
            </>
          }
        />

        <CardContent>
          <Stack gap={0.5}>
            <Box display="flex" gap={1}>
              <Typography variant="body2">Estimated Salary:</Typography>
              <Typography variant="body2" color="text.secondary">
                {props.minJdSalary || "unknown"} -{" "}
                {props.maxJdSalary || "unknown"} {props.salaryCurrencyCode}
              </Typography>
            </Box>

            <Box display="flex" gap={1}>
              <Typography variant="body2">Experience:</Typography>
              <Typography variant="body2" color="text.secondary">
                {props.minExp || "unknown"} - {props.maxExp || "unknown"} years
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2">Job Description: </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 4,
                }}
              >
                {props.jobDetailsFromCompany}
              </Typography>
              <Button
                sx={{ textTransform: "lowercase", p: 0 }}
                onClick={() => setShowDescription(true)}
              >
                see more
              </Button>
            </Box>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            href={props.jdLink}
            target="_blank"
            rel="noreferrer"
            fullWidth
          >
            View Job
          </Button>
        </CardActions>
      </Card>

      {/* to show the full job description */}
      <Dialog open={showDescription} onClose={() => setShowDescription(false)}>
        <DialogTitle>Job Description:</DialogTitle>
        <DialogContent>
          <Typography>{props.jobDetailsFromCompany}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
