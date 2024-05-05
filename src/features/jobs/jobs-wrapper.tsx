import { Box } from "@mui/material";
import { Children, useEffect, useRef } from "react";
import { JobCard } from "../../components";
import { useFetchJobs } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../redux/reducer/hooks";
import { IJob, reset } from "../../redux/reducer/jobs-slicer";

export const JobsWrapper = () => {
  //action dispatcher function
  const dispatch = useAppDispatch();
  //data coming from redux
  const { data, allFetched } = useAppSelector((state) => state.Jobs);
  //filter data from redux
  const { filter } = useAppSelector((state) => state.Filter);
  //custom hook to fetch the jobs
  const { fetchJobs } = useFetchJobs();
  //observer element ref
  const observerElement = useRef<HTMLElement | null>(null);
  //page number ref
  const page = useRef(1);

  /**
   * @param job
   * @returns boolean
   */
  const applyFilter = (job: IJob) => {
    const conditions = [
      //company name filter
      () =>
        !filter.companyName ||
        job.companyName
          .toLowerCase()
          .includes(filter.companyName.toLowerCase()),
      //min experience filter
      () => !filter.minExp || Number(job.minExp) <= Number(filter.minExp),
      //min salary filter
      () =>
        !filter.minSalary ||
        Number(job.minJdSalary) >= Number(filter.minSalary),

      //location filter
      () =>
        !filter.location ||
        filter.location.length === 0 ||
        filter.location.some((location) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        ),
      //job role filter
      () =>
        !filter.jobRole ||
        filter.jobRole.length === 0 ||
        filter.jobRole.some((role) =>
          job.jobRole.toLowerCase().includes(role.toLowerCase())
        ),
    ];

    return conditions.every((condition) => condition());
  };

  /**
   * @param entities
   * @description Intersection Observer callback
   */
  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      fetchJobs(page.current, data.totalResults);
      page.current += 1;
    }
  };

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (observerElement.current) {
      observer.observe(observerElement.current);
    }

    //unmount cleanup
    return () => {
      observer.disconnect();
      dispatch(reset());
    };
  }, [data.totalResults]);

  return (
    <>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={3}
        overflow={"scroll"}
        p={1}
        maxHeight={"85vh"}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        {Children.toArray(
          data.jobs.filter(applyFilter).map((job) => <JobCard {...job} />)
        )}
        <Box ref={observerElement}></Box>
      </Box>
      {allFetched && (
        <Box textAlign={"center"} border="1px solid #d8f2d4" color={"#1a4605"}>
          Congrats! You have explored All the jobs.
        </Box>
      )}
    </>
  );
};
