import { useAppDispatch } from "../redux/reducer/hooks";
import {
  allFetched,
  error,
  loading,
  success,
} from "../redux/reducer/jobs-slicer";

const limit = 50;

export const useFetchJobs = () => {
  const dispatch = useAppDispatch();

  /**
   * @param page
   * @param totalResults
   * @description Fetch jobs from the API and dispatch the actions  based on the response from the server and the error.  Also handle the all data fetched from the server by calculating the offset and limit
   */

  const fetchJobs = async (page: number = 1, totalResults: number) => {
    const offset = (page - 1) * limit;
    if (totalResults > 0 && totalResults <= offset) {
      dispatch(allFetched());
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    try {
      dispatch(loading());
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await response.json();
      dispatch(
        success({
          jobs: data.jdList,
          totalResults: data.totalCount,
        })
      );
    } catch (err) {
      console.error(err);
      dispatch(error(err));
    }
  };

  return {
    fetchJobs,
  };
};
