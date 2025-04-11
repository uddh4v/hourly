import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import ProtectedRoutes from "./protected-route";

import { Progress } from "@/components/ui/progress";

// Lazy loaded components
const LoginPage = lazy(() => import("@/app/pages/authentication/page"));
const DashboardPage = lazy(() => import("@/app/pages/dashboard/dashboard"));
const NotFound = lazy(() => import("@/app/pages/error/error"));
const HeroSection = lazy(() => import("@/app/pages/hero"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen flex-col gap-4">
          <Progress value={33} className="w-1/4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route index element={<HeroSection />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
