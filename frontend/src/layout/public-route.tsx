import { isUserAuthenticated } from "@/store/selectors";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const isAuthenticated = useSelector(isUserAuthenticated);
  return isAuthenticated ? <Navigate to="/main" replace /> : <Outlet />;
};

export default PublicRoute;
