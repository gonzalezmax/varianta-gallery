
import React from "react";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="mb-8 text-3xl font-bold">Sign In to VARIANTA</h1>
      <div className="w-full max-w-md">
        <ClerkSignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          appearance={{
            elements: {
              rootBox: "w-full mx-auto",
              card: "shadow-lg rounded-lg border p-6",
              socialButtonsBlockButton: "border rounded-md",
            },
          }}
          socialAuth={{
            strategy: "google",
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
