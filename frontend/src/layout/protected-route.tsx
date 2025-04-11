import { Progress } from "@/components/ui/progress";
import { getUserById } from "@/service/auth/login";
import { clearUser, setUser } from "@/store/reducers/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router"; // <- use `react-router-dom` here

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        dispatch(clearUser());
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await getUserById(userId);
        if (response.status === "success") {
          dispatch(setUser(response.user));
          setIsAuthenticated(true);
        } else {
          dispatch(clearUser());
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        dispatch(clearUser());
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isAuthenticated === null) {
    // Show loading progress while auth is being checked
    return <Progress />;
  }

  // If authenticated, show the nested routes. If not, redirect to login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
