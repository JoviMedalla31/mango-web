import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  base: "/guadalupe-mangoes/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Use ESM-safe resolution for Vite config
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
