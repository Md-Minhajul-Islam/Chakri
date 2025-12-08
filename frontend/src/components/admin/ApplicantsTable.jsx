import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useParams } from "react-router-dom";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const params = useParams();

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        try {
          const res = await axios.get(
            `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
            { withCredentials: true }
          );
          dispatch(setAllApplicants(res.data.job));
        } catch (error) {
          toast.error(error.response?.data?.message);
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[700px]">
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow
              key={item?._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 hover:underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((currStatus, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(currStatus, item?._id)}
                        className="flex w-fit items-center my-2 cursor-pointer"
                      >
                        <Badge
                          className={
                            item?.status?.toLowerCase() === "accepted" &&
                            currStatus.toLowerCase() === "accepted"
                              ? "bg-green-500"
                              : item?.status?.toLowerCase() === "rejected" &&
                                currStatus.toLowerCase() === "rejected"
                              ? "bg-red-500"
                              : ""
                          }
                        >
                          {currStatus}
                        </Badge>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
