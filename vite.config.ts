/* eslint-disable @typescript-eslint/no-unsafe-call */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to our express server
      "/api": {
        // target: "https://ndc-backend-410021.uc.r.appspot.com/",
        target: "http://localhost:3001/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
