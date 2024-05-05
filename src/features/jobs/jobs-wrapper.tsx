import { Box } from "@mui/material";
import { Children, useEffect } from "react";
import { JobCard } from "../../components";
import { useFetchJobs } from "../../hooks";
import { useAppSelector } from "../../redux/reducer/hooks";

export const JobsWrapper = () => {
  const { data, error, loading } = useAppSelector((state) => state.Jobs);
  const { fetchJobs } = useFetchJobs();
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      gap={3}
      maxHeight={"90vh"}
      overflow={"scroll"}
      p={1}
    >
      {Children.toArray(data.jobs.map((job) => <JobCard {...job} />))}
    </Box>
  );
};
