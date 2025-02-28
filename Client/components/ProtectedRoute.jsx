import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token || token.split(".").length !== 3) {
      navigate("/login", { replace: true }); // Redirect if no valid token
    }
  }, [navigate, token]);

  return token ? children : null; // Render children if token exists
};

export default ProtectedRoutes;
