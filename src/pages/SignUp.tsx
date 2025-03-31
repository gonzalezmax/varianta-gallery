
import React from "react";
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="mb-8 text-3xl font-bold">Create an Account</h1>
      <div className="w-full max-w-md">
        <ClerkSignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/"
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

export default SignUp;
