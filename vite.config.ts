import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['a2d8-2401-4900-5b84-158f-3491-ecf7-968f-34c4.ngrok-free.app'], // e.g., '10.0.0.15' or '*'
  }
});
