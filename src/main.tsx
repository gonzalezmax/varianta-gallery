
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

// Replace with your actual publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_dummy-key-for-development";

// Use a dummy key in development mode if real key is missing
const isDevelopment = import.meta.env.DEV;
const finalKey = PUBLISHABLE_KEY === "pk_test_dummy-key-for-development" && !isDevelopment 
  ? null 
  : PUBLISHABLE_KEY;

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key. Authentication features will not work properly. Please set VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={finalKey}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
