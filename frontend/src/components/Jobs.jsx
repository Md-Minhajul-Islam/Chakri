import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchedQuery?.toLowerCase()) ||
          job?.description
            ?.toLowerCase()
            .includes(searchedQuery?.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery?.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [searchedQuery, allJobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <FilterCard />
          </div>

          {allJobs?.length <= 0 ? (
            <span className="text-gray-600 text-lg font-medium">
              No jobs found
            </span>
          ) : (
            <div className="flex-1 h-[85vh] overflow-y-auto pb-6 pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filterJobs?.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    key={job._id}
                  >
                    <Job key={job._id} job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
