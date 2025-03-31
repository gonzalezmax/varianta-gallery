
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

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
            <Link 
              to="/sign-in" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden md:flex"
              aria-label="Sign In"
            >
              <LogIn size={20} />
            </Link>
          </SignedOut>
          
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
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Account
              </Link>
            </SignedOut>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100">
                <Search size={20} />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              <Button variant="outline" size="sm" className="text-sm" onClick={() => setIsSearchOpen(false)}>
                Running shoes
              </Button>
              <Button variant="outline" size="sm" className="text-sm" onClick={() => setIsSearchOpen(false)}>
                Wireless headphones
              </Button>
              <Button variant="outline" size="sm" className="text-sm" onClick={() => setIsSearchOpen(false)}>
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
