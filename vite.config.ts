import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import pxtorem from "postcss-pxtorem";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": "/src/components",
      "@/hooks": "/src/hooks",
      "@/styles": "/src/app/styles",
      "@/store": "/src/store",
      "@/types": "/src/types",
      "@/utils": "/src/utils",
      "@/services": "/src/services",
      "@/assets": "/src/assets",
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer({}), pxtorem({ replace: true, propList: ["*"] })],
    },
  },
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  }
});
