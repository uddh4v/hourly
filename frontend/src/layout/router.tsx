import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import ProtectedRoutes from "./protected-route";
import { Progress } from "@/components/ui/progress";

// Lazy loaded components
const HeroSection = lazy(() => import("@/app/pages/hero"));
const LoginPage = lazy(() => import("@/app/pages/authentication/page"));
const Main = lazy(() => import("@/app/pages/main/page"));
const NotFound = lazy(() => import("@/app/pages/error/error"));

const AppRouter = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          return prevProgress + 5; // Increment the progress by 5
        }
        clearInterval(interval); // Stop the interval once it reaches 100
        return 90;
      });
    }, 10);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen flex-col gap-4">
          <Progress value={progress} className="w-1/4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route index element={<HeroSection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/main" element={<Main />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
