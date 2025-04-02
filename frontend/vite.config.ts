import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import ReactComponentName from "react-scan/react-component-name/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ReactComponentName({})],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
