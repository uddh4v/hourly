import { Progress } from "@/components/ui/progress";
import { getUserById } from "@/service/auth/login";
import { clearUser, setUser } from "@/store/reducers/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // null for loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const userId = localStorage.getItem("userId") || "";
      try {
        console.log(userId);
        const response = await getUserById(userId);
        if (response.status === "success") {
          dispatch(setUser(response.user)); // Dispatch user data to Redux
          setIsAuthenticated(true);
          navigate("dashboard");
        } else {
          dispatch(clearUser());
          setIsAuthenticated(false);
          navigate("login"); // Navigate to the login page
        }
      } catch (error) {
        console.log(error);
        dispatch(clearUser());
        setIsAuthenticated(false);
        navigate("login"); // Navigate to the login page
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    // Loading state while checking auth
    return <Progress />;
  }

  return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoutes;
