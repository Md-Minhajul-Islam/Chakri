import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button.jsx";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Cha<span className="text-[#F83002]">kri</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-6 font-medium text-gray-700">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#6A38C2] transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                    className="object-cover"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div>
                  <div className="flex items-center gap-3 border-b pb-3">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        className="object-cover"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-3">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 text-gray-700 hover:text-[#6A38C2]"
                      >
                        <User2 />
                        <span>View Profile</span>
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 mt-3 text-gray-700 hover:text-red-500"
                    >
                      <LogOut />
                      Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <button
          className="md:hidden block"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-sm">
          <ul className="space-y-3 text-gray-700 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="space-y-3">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <h4 className="font-semibold">{user?.fullname}</h4>
                  <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                </div>
              </div>

              {user?.role === "student" && (
                <Link to="/profile" className="flex items-center gap-2">
                  <User2 />
                  View Profile
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
