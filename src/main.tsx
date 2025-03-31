
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

// Get the publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we have a valid publishable key
const hasValidPublishableKey = PUBLISHABLE_KEY && 
  PUBLISHABLE_KEY !== "pk_test_dummy-key-for-development" && 
  !PUBLISHABLE_KEY.startsWith("pk_test_dummy");

if (!hasValidPublishableKey) {
  console.warn("Missing valid Clerk Publishable Key. Authentication features will not work properly. Please set VITE_CLERK_PUBLISHABLE_KEY environment variable with a valid key from your Clerk dashboard.");
}

// Conditionally render with or without ClerkProvider based on key availability
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {hasValidPublishableKey ? (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        clerkJSVersion="5.56.0-snapshot.v20250312225817"
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
