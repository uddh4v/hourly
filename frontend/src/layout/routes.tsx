// import { DataTableDemo } from "@/app/pages/admin/approveUser/approveUser";

import { DataTableDemo } from "@/app/pages/admin/userManagement/user-management";

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

      <Route path="dashboard" element={<DashBoard />}>
        {/* This will render inside the <Outlet /> of DashBoard */}
        <Route path="settings/user-management" element={<DataTableDemo />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />

      {/* admin routes  */}
    </Routes>
  );
}

export default AppRouter;
