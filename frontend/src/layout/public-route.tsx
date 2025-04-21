import { userAuthenticated } from "@/store/selectors";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const isAuthenticated = useSelector(userAuthenticated);
  return isAuthenticated ? <Navigate to="/main" replace /> : <Outlet />;
};

export default PublicRoute;
