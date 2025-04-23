import { Progress } from "@/components/ui/progress";
import { getUserById } from "@/service/auth/login";
import { clearUser, setUser } from "@/store/reducers/userSlice";
import { getUserId } from "@/store/selectors";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router"; // ✅ corrected

const ProtectedRoutes = () => {
  const userId = useSelector(getUserId);
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
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
        console.error("Authentication check failed:", error);
        dispatch(clearUser());
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [dispatch, userId]); // ✅ added userId to dependencies

  if (isAuthenticated === null) {
    return <Progress />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
