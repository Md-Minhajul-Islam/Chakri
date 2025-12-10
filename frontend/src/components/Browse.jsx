import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetFilteredJobs from "../hooks/useGetFilteredJobs";

const Browse = () => {
  useGetFilteredJobs();
  const { filteredJobs } = useSelector((store) => store.job);

  return (
    <div>
      {" "}
      <Navbar />{" "}
      <div className="max-w-7xl mx-auto my-10 px-4">
        {" "}
        <h1 className="font-bold text-xl my-10 text-center sm:text-left">
          Search Results ({filteredJobs?.length}){" "}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs?.length === 0 ? (
            <span className="text-center col-span-full text-gray-500">
              No Jobs Found
            </span>
          ) : (
            filteredJobs?.map((job) => <Job key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
