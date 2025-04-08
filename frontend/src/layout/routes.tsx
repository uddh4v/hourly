import { DataTableDemo } from "@/app/pages/admin/userManagement/user-management";
import DashboardPage from "@/app/pages/dashboard/page";
import DashBoard from "@/app/pages/dashboard1/dashboard";
import NotFoundPage from "@/app/pages/error/notFound";
import Home from "@/app/pages/home/home";
import LoginPage from "@/app/pages/login/login";
import { Route, Routes } from "react-router";

function AppRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="dashboard" element={<DashBoard />}>
        <Route path="settings/user-management" element={<DataTableDemo />} />
        <Route path="settings/dashboard1" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />

      {/* admin routes  */}
    </Routes>
  );
}

export default AppRouter;
