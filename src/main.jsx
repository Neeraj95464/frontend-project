// import { AuthProvider } from "./components/AuthContext.jsx";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       {/* <BrowserRouter> */}
//       <App />
//       {/* </BrowserRouter> */}
//     </AuthProvider>
//   </StrictMode>
// );

import { AuthProvider } from "./components/AuthContext.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// ✅ Import PWA service worker register
import { registerSW } from "virtual:pwa-register";

// ✅ Register the service worker
registerSW({
  immediate: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* If you want routing later, you can uncomment this */}
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </AuthProvider>
  </StrictMode>
);
