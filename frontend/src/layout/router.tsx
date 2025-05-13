import ProtectedRoutes from "./protected-route";
import PublicRoute from "./public-route";
import HeroSection from "@/app/pages/hero";
import LoginPage from "@/app/pages/authentication/page";
import NotFound from "@/app/pages/error/error";
import Main from "@/app/pages/main/page";
import { createBrowserRouter } from "react-router";

export const AppRouter = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { index: true, element: <HeroSection /> },
      { path: "login", element: <LoginPage /> },
      // { loader: Progress },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [{ path: "main", element: <Main /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
