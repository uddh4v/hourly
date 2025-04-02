import DashBoard from "@/app/pages/dashboard/dashboard";
import NotFoundPage from "@/app/pages/error/notFound";
import Home from "@/app/pages/home/home";
import LoginPage from "@/app/pages/login/login";
import { Route, Routes } from "react-router";

function AppRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="dashboard" element={<DashBoard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
