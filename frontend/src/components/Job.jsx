import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      className="
      p-5 rounded-xl shadow-md bg-white border border-gray-100 
      hover:shadow-lg transition-all duration-200
    "
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full h-8 w-8" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={job?.company?.logo} className="object-cover" />
        </Avatar>
        <div>
          <h1 className="font-semibold text-base">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div className="mt-3">
        <h1 className="font-bold text-lg text-gray-900">{job?.title}</h1>

        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="secondary">
          {job?.position} positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white flex-1 hover:bg-[#5f089b]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
