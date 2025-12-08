import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user?.role?.toLowerCase() !== "student") {
      navigate("/login");
    } else {
      setValid(true);
    }
  }, []);

  return <>{valid && children}</>;
};
export default ProtectedRoute;
