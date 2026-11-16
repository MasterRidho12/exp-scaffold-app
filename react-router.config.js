import { vercelPreset } from "@vercel/react-router/vite";

/** @type {import('@react-router/dev/config').Config} */
export default {
  ssr: true,
  presets: [vercelPreset()],
  allowedActionOrigins: [
    "admin.shopify.com",
    "*.admin.shopify.com",
    "*.myshopify.com",
    "*.trycloudflare.com",
    "localhost",
    "localhost:*",
    "127.0.0.1",
    "127.0.0.1:*",
    "*.spin.dev",
    "*.vercel.app",
  ],
};
