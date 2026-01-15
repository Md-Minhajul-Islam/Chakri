import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constants";
import { persistor } from "@/redux/store";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch({ type: "auth/logout" });
        persistor.purge();
        navigate("/");
        toast.success(res.data.message);
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">

        <Link to="/" className="text-xl font-bold tracking-tight">
          Cha<span className="text-[#6A38C2]">kri</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            {user?.role === "recruiter" ? (
              <>
                <MenuLink to="/admin/companies" label="Companies" />
                <MenuLink to="/admin/jobs" label="Jobs" />
              </>
            ) : (
              <>
                <MenuLink to="/" label="Home" />
                <MenuLink to="/jobs" label="Jobs" />
                <MenuLink to="/browse" label="Browse" />
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
                <Avatar className="h-9 w-9 cursor-pointer border hover:ring-2 hover:ring-[#6A38C2] transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-72 rounded-xl shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user?.fullname}</p>
                      <p className="text-xs text-gray-500">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-sm hover:text-[#6A38C2]"
                    >
                      <User2 size={16} />
                      View Profile
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-sm text-red-500"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <ul className="space-y-3 text-sm font-medium">
              {user?.role === "recruiter" ? (
                <>
                  <MobileLink to="/admin/companies" label="Companies" />
                  <MobileLink to="/admin/jobs" label="Jobs" />
                </>
              ) : (
                <>
                  <MobileLink to="/" label="Home" />
                  <MobileLink to="/jobs" label="Jobs" />
                  <MobileLink to="/browse" label="Browse" />
                </>
              )}
            </ul>

            {!user ? (
              <div className="space-y-2 flex flex-col items-center">
                <Link to="/login" className="w-full max-w-xs">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full max-w-xs">
                  <Button className="w-full bg-[#6A38C2] text-white">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{user?.fullname}</p>
                    <p className="text-xs text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {user?.role === "student" && (
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm hover:text-[#6A38C2]"
                  >
                    <User2 size={16} />
                    View Profile
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 text-sm text-red-500"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const MenuLink = ({ to, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative ${
          isActive ? "text-[#6A38C2] after:w-full" : "hover:text-[#6A38C2]"
        }
        after:absolute after:left-0 after:-bottom-1 after:h-[2px]
        after:bg-[#6A38C2] after:w-0 after:transition-all`
      }
    >
      {label}
    </NavLink>
  </li>
);

const MobileLink = ({ to, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block ${isActive ? "text-[#6A38C2]" : "text-gray-700"}`
      }
    >
      {label}
    </NavLink>
  </li>
);

export default Navbar;
