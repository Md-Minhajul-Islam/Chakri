import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      return toast.error("Please select a role");
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>

          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Minhaj"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="min@mail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="0000000000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <RadioGroup className="flex items-center gap-6">
              {["student", "recruiter"].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={changeEventHandler}
                    id={role}
                  />
                  <Label htmlFor={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex flex-col">
              <Label>Profile Picture</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Please wait" : "Sign Up"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
