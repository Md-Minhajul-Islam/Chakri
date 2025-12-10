import React from "react";
import Job from "./Job";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      {" "}
      <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
        {" "}
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings{" "}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {allJobs?.length <= 0 ? (
          <span className="text-center col-span-full text-gray-500">
            Signup/Login to see all jobs
          </span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <Job key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
