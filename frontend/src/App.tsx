import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import AppRouter from "./layout/router";
import { ModeToggle } from "./theme/darkmode/mode-toggle";
import { ThemeProvider } from "./theme/darkmode/theme-provider";


import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      {/* Wrap with Provider */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-center" richColors />
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}
