import LoginPage from "@/app/pages/authentication/page";
import DashboardPage from "@/app/pages/dashboard/dashboard";
import NotFound from "@/app/pages/error/error";
import HeroSection from "@/app/pages/hero";

import { Route, Routes } from "react-router";
import ProtectedRoutes from "./protected-route";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<HeroSection />} />
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
