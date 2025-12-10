import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          `${JOB_API_END_POINT}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        // toast.error(error.response.data.message);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
