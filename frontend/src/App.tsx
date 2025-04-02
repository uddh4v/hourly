import { Toaster } from "./components/ui/sonner";
import AppRouter from "./layout/routes";

export default function App() {
  return (
    <div>
      <Toaster position="top-center" richColors />
      <AppRouter />
    </div>
  );
}
