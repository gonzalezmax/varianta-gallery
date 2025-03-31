
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import AddProduct from "./pages/AddProduct";

const queryClient = new QueryClient();

const App = () => {
  // Check if Clerk is available based on environment variable
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pb-12">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/search" element={<SearchResults />} />
                  {/* Always render these routes, even if Clerk isn't available */}
                  <Route path="/sign-in/*" element={<SignIn />} />
                  <Route path="/sign-up/*" element={<SignUp />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  {isClerkAvailable && (
                    <Route path="/account" element={<Account />} />
                  )}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
