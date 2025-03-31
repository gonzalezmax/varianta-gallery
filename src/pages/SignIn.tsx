
import React, { useEffect, useState } from "react";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SignIn = () => {
  const [isClerkAvailable, setIsClerkAvailable] = useState(false);
  
  useEffect(() => {
    // Check if we have a valid Clerk publishable key
    const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    const isValidKey = publishableKey && 
      publishableKey !== "pk_test_dummy-key-for-development" && 
      !publishableKey.startsWith("pk_test_dummy");
      
    setIsClerkAvailable(isValidKey);
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="mb-8 text-3xl font-bold">Sign In to VARIANTA</h1>
      
      {isClerkAvailable ? (
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
          />
        </div>
      ) : (
        <div className="w-full max-w-md text-center border rounded-lg shadow-lg p-6">
          <div className="mb-6 text-amber-600 bg-amber-50 p-4 rounded-md">
            <p className="font-medium">Authentication is not configured</p>
            <p className="text-sm mt-2">
              A Clerk publishable key is required to enable authentication.
            </p>
          </div>
          
          <p className="mb-6 text-gray-600">
            In a real application, this would be the sign-in form.
          </p>
          
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Return to Home
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
