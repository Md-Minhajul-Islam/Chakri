import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import useGetAppliedJobs from "../hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white shadow-md border border-gray-200 rounded-2xl my-6 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="font-semibold text-2xl">{user?.fullname}</h1>
              <p className="text-gray-600 text-sm">{user?.profile?.bio}</p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-gray-600" />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-gray-600" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="font-semibold mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-md font-semibold">Resume</Label>
          <a
            target="_blank"
            href={user?.profile?.resume}
            className="block w-fit text-blue-600 font-medium mt-1 hover:underline"
          >
            {user?.profile?.resumeOriginalName}
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mb-10">
        <h1 className="font-bold text-xl mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
