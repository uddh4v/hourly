import LoginPage from "@/app/pages/authentication/page";
import DashboardPage from "@/app/pages/dashboard/dashboard";
import Hero from "@/app/pages/hero";
import { Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Hero />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRouter;
