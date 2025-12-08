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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) {
      return toast.error("Please select a role");
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="minhaj@mail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              required
            />
          </div>

          <RadioGroup className="flex items-center gap-6 my-4 justify-center">
            {["student", "recruiter"].map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id={role}
                />
                <Label htmlFor={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            type="submit"
            className="w-full flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Please wait" : "Login"}
          </Button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
