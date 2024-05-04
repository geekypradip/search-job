import { useAppDispatch } from "../redux/reducer/hooks";
import { error, loading, success } from "../redux/reducer/jobs-slicer";

export const useFetchJobs = () => {
  const dispatch = useAppDispatch();
  const fetchJobs = async (page: number = 1) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: (page - 1) * 10,
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
      console.log(data);
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
