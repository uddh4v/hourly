import DashboardPage from "./app/pages/dashboard/dashboard";
import { ThemeProvider } from "./theme/darkmode/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DashboardPage />
    </ThemeProvider>
  );
}
