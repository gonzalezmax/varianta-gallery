
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import CategoryPage from "./pages/CategoryPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ClerkLoading>
            <div className="h-1 bg-primary animate-pulse fixed top-0 left-0 right-0 z-50"></div>
          </ClerkLoading>
          <ClerkLoaded>
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
                  <Route path="/sign-in/*" element={<SignIn />} />
                  <Route path="/sign-up/*" element={<SignUp />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ClerkLoaded>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
