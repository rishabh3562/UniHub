import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./contexts/UserProvider.jsx";
// import AuthProvider from "./contexts/AuthProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
    </UserProvider>
  </React.StrictMode>
);
