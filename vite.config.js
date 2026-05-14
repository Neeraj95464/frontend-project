// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),

//     VitePWA({
//       registerType: "autoUpdate",

//       // IMPORTANT
//       injectRegister: "auto",

//       devOptions: {
//         enabled: false, // disable PWA in local
//       },

//       includeAssets: ["favicon.ico", "apple-touch-icon.png"],

//       manifest: {
//         id: "/",
//         name: "Mahavir Group",
//         short_name: "Help Desk",
//         description: "Help Desk Portal of Mahavir Group",

//         start_url: "/",
//         scope: "/",

//         display: "standalone",

//         background_color: "#ffffff",
//         theme_color: "#000000",

//         icons: [
//           {
//             src: "/pwa-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },

//       workbox: {
//         cleanupOutdatedCaches: true,

//         skipWaiting: true,
//         clientsClaim: true,

//         maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,

//         globPatterns: ["**/*.{js,css,html,ico,png,svg}"],

//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/.*$/,
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "api-cache",
//               expiration: {
//                 maxEntries: 50,
//                 maxAgeSeconds: 86400,
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],

//   resolve: {
//     alias: {
//       "@": "/src",
//     },
//   },

//   build: {
//     chunkSizeWarningLimit: 5000,

//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ["react", "react-dom"],
//         },
//       },
//     },
//   },
// });

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
