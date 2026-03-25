import path from "path";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@MEPages": path.resolve(__dirname, 'src/pages'),
      "@MERedux": path.resolve(__dirname, 'src/slice'),
      "@MEUtils": path.resolve(__dirname, "./src/utils"),
      "@MEHelpers": path.resolve(__dirname, 'src/helpers'),
      "@MEContexts": path.resolve(__dirname, "./src/contexts"),
      "@MEShadcnComponents": path.resolve(__dirname, "./src/components/ui"),
      "@MECommonComponents": path.resolve(__dirname, "./src/components/common"),
    },
  },
});
