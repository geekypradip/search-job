import { Box } from "@mui/material";
import { Children, useEffect } from "react";
import { JobCard } from "../../components";
import { useFetchJobs } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../redux/reducer/hooks";
import { IJob, reset } from "../../redux/reducer/jobs-slicer";

export const JobsWrapper = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.Jobs);
  const { filter } = useAppSelector((state) => state.Filter);
  const { fetchJobs } = useFetchJobs();

  const handleFilter = (job: IJob) => {
    const conditions = [
      () =>
        !filter.companyName ||
        job.companyName
          .toLowerCase()
          .includes(filter.companyName.toLowerCase()),
      () => !filter.minExp || Number(job.minExp) <= Number(filter.minExp),

      () =>
        !filter.minSalary ||
        Number(job.minJdSalary) >= Number(filter.minSalary),

      () =>
        !filter.location ||
        filter.location.length === 0 ||
        filter.location.some((location) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        ),
      () =>
        !filter.jobRole ||
        filter.jobRole.length === 0 ||
        filter.jobRole.some((role) =>
          job.jobRole.toLowerCase().includes(role.toLowerCase())
        ),
    ];

    return conditions.every((condition) => condition());
  };

  useEffect(() => {
    fetchJobs();

    return () => {
      dispatch(reset());
    };
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
      {Children.toArray(
        data.jobs.filter(handleFilter).map((job) => <JobCard {...job} />)
      )}
    </Box>
  );
};
