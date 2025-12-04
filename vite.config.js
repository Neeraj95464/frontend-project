// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": "/src", // Ensure that this is pointing to the correct directory
//     },
//   },
// });

// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",
//       includeAssets: ["favicon.ico", "apple-touch-icon.png"],
//       manifest: {
//         name: "IT Inventory & Ticketing Portal",
//         short_name: "IT Portal",
//         start_url: "/",
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
//     }),
//   ],

//   resolve: {
//     alias: {
//       "@": "/src",
//     },
//   },
// });

// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",

//       devOptions: {
//         enabled: true, // required to test PWA in local preview
//       },

//       includeAssets: ["favicon.ico", "apple-touch-icon.png"],

//       manifest: {
//         name: "IT Inventory & Ticketing Portal",
//         short_name: "IT Portal",
//         start_url: "/",
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

//       // FIX: Increase file size limit for large JS bundle
//       workbox: {
//         maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
//       },
//     }),
//   ],

//   resolve: {
//     alias: {
//       "@": "/src",
//     },
//   },
// });

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      devOptions: {
        enabled: true, // enable PWA in local environment
      },

      includeAssets: ["favicon.ico", "apple-touch-icon.png"],

      manifest: {
        id: "/",
        name: "Mahavir Group",
        short_name: "Help Desk Portal",
        description: "Help Desk Portal of Mahavir Group",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],

        // REQUIRED for fixing warnings
        screenshots: [
          {
            src: "/screenshot-wide.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshot-mobile.png",
            sizes: "390x844",
            type: "image/png",
            // no form_factor → works for mobile
          },
        ],
      },

      // Increase Workbox limit (5 MB)
      // workbox: {
      //   maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      // },

      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
