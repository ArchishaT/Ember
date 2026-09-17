import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // No source maps in the shipped build — keeps the production
    // bundle from exposing original source and reduces output size.
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the router/helmet dependencies from app code so the
        // browser can cache vendor code separately from app updates.
        manualChunks(id: string) {
          if (id.includes("react-helmet-async")) return "seo";
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router")
          ) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
