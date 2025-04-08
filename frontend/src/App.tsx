import { Toaster } from "./components/ui/sonner";
import AppRouter from "./layout/routes";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-center" richColors />
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}
