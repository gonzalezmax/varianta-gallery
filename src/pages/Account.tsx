
import React, { useEffect, useState } from "react";
import { useUser, useClerk, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Account = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isClerkAvailable, setIsClerkAvailable] = useState(false);
  
  useEffect(() => {
    // Check if we have a valid Clerk publishable key
    const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    const isValidKey = publishableKey && 
      publishableKey !== "pk_test_dummy-key-for-development" && 
      !publishableKey.startsWith("pk_test_dummy");
      
    setIsClerkAvailable(isValidKey);
    
    // If Clerk is not available, redirect to home
    if (!isValidKey) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (!isClerkAvailable) {
    return null;
  }

  return (
    <>
      <SignedIn>
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                {user?.imageUrl && (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">{user?.fullName || user?.firstName}</p>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-lg border">
              <div>
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <div className="grid gap-4">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-muted-foreground">{user?.fullName || `${user?.firstName} ${user?.lastName || ''}`}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="text-center p-6 border rounded-md">
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Account;
