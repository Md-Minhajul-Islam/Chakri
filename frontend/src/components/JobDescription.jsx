import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constants";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const [singleJob, setSingleJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const { id: jobId } = useParams();

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setIsApplied(
            res.data.job.applications.some((app) => app.applicant === user?._id)
          );
          setSingleJob(res.data.job);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchSingleJob();
  }, [jobId, user?._id]);

  if (!singleJob) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto my-10 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg shadow">
          <div>
            <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="secondary"
                className="text-blue-700 font-semibold"
              >
                {singleJob?.position} Positions
              </Badge>
              <Badge
                variant="secondary"
                className="text-[#F83002] font-semibold"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                variant="secondary"
                className="text-[#7209b7] font-semibold"
              >
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`px-6 py-2 rounded-lg text-white ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5e0fa0]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div className="bg-white p-6 mt-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            Job Description
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            {singleJob?.description}
          </p>

          <div>
            <h3 className="font-medium mb-2">Skills Required</h3>

            <div className="flex flex-wrap gap-2">
              {singleJob?.requirements?.length > 0 ? (
                singleJob.requirements.map((skill, index) => (
                  <span className="text-sm " key={index} variant="secondary">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 mt-6 rounded-lg shadow space-y-3">
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            Job Details
          </h2>
          <DetailRow label="Role" value={singleJob?.title} />
          <DetailRow label="Location" value={singleJob?.location} />
          <DetailRow
            label="Experience"
            value={`${singleJob?.experienceLevel} yrs`}
          />
          <DetailRow label="Salary" value={`${singleJob?.salary} LPA`} />
          <DetailRow
            label="Total Applicants"
            value={singleJob?.applications?.length}
          />
          <DetailRow
            label="Posted Date"
            value={singleJob?.createdAt?.split("T")[0]}
          />
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between text-gray-800">
    <span className="font-bold">{label}:</span>
    <span className="pl-0 sm:pl-4 font-normal">{value}</span>
  </div>
);

export default JobDescription;
