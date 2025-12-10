import { setFilteredJobs } from "../redux/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetFilteredJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          searchedQuery === "" ||
          job?.title?.toLowerCase().includes(searchedQuery?.toLowerCase()) ||
          job?.description
            ?.toLowerCase()
            .includes(searchedQuery?.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery?.toLowerCase())
        );
      });
      dispatch(setFilteredJobs(filteredJobs));
    } else {
      dispatch(setFilteredJobs(allJobs));
    }
  }, [searchedQuery]);
};

export default useGetFilteredJobs;
