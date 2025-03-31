
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Check if we have a valid Clerk publishable key
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isClerkAvailable = publishableKey && 
    publishableKey !== "pk_test_dummy-key-for-development" && 
    !publishableKey.startsWith("pk_test_dummy");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl tracking-tight">VARIANTA</Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/category/all" className="text-sm font-medium hover:text-primary transition-colors">All Products</Link>
          <Link to="/category/footwear" className="text-sm font-medium hover:text-primary transition-colors">Footwear</Link>
          <Link to="/category/apparel" className="text-sm font-medium hover:text-primary transition-colors">Apparel</Link>
          <Link to="/category/electronics" className="text-sm font-medium hover:text-primary transition-colors">Electronics</Link>
          <Link to="/category/accessories" className="text-sm font-medium hover:text-primary transition-colors">Accessories</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSearch} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          {isClerkAvailable ? (
            <>
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonBox: "p-2 rounded-full hover:bg-gray-100 transition-colors hidden md:flex",
                    }
                  }}
                />
              </SignedIn>
              
              <SignedOut>
                <Button 
                  asChild
                  variant="primary" 
                  size="sm"
                  className="hidden md:flex items-center gap-2"
                >
                  <Link to="/sign-in">
                    <LogIn size={16} />
                    Sign In
                  </Link>
                </Button>
                
                <Link 
                  to="/sign-in" 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
                  aria-label="Sign In"
                >
                  <LogIn size={20} />
                </Link>
              </SignedOut>
            </>
          ) : (
            <Link 
              to="/" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden md:flex"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
          )}
          
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ShoppingBag size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/category/all" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link 
              to="/category/footwear" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Footwear
            </Link>
            <Link 
              to="/category/apparel" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Apparel
            </Link>
            <Link 
              to="/category/electronics" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link 
              to="/category/accessories" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </Link>
            
            {isClerkAvailable ? (
              <>
                <SignedIn>
                  <Link 
                    to="/account" 
                    className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                </SignedIn>
                
                <SignedOut>
                  <Link 
                    to="/sign-in" 
                    className="flex items-center py-2 px-3 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} className="mr-2" />
                    Sign In / Create Account
                  </Link>
                </SignedOut>
              </>
            ) : (
              <Link 
                to="/" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Account (Auth Not Available)
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <Search size={20} />
              </Button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm" 
                onClick={() => {
                  setSearchQuery("running shoes");
                  navigate("/search?q=running+shoes");
                  setIsSearchOpen(false);
                }}
              >
                Running shoes
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm" 
                onClick={() => {
                  setSearchQuery("wireless headphones");
                  navigate("/search?q=wireless+headphones");
                  setIsSearchOpen(false);
                }}
              >
                Wireless headphones
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm" 
                onClick={() => {
                  setSearchQuery("leather jacket");
                  navigate("/search?q=leather+jacket");
                  setIsSearchOpen(false);
                }}
              >
                Leather jacket
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
