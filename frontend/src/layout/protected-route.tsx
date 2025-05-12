import { Progress } from "@/components/ui/progress";
import { getUserById } from "@/service/auth/login";
import { clearUser, setUser } from "@/store/reducers/userSlice";
import { getUserId } from "@/store/selectors";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";

const ProtectedRoutes = () => {
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId) throw new Error("No userId");
      return getUserById(userId);
    },
    enabled: !!userId, // Only run if userId exists
  });

  useEffect(() => {
    if (data?.status === "success") {
      dispatch(setUser(data.user));
    } else if (isError) {
      dispatch(clearUser());
    }
  }, [data, isError, dispatch]);

  if (isLoading) return <Progress />;
  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
