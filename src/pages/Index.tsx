
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

// Choose random featured products
const featuredProducts = [...products]
  .sort(() => 0.5 - Math.random())
  .slice(0, 8);

// Categories with images
const categories = [
  {
    id: "footwear",
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: "apparel",
    name: "Apparel",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e",
  },
];

const Index = () => {
  // Check if we have a valid Clerk publishable key
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isClerkAvailable = publishableKey && 
    publishableKey !== "pk_test_dummy-key-for-development" && 
    !publishableKey.startsWith("pk_test_dummy");

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-12 md:py-20 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the Latest Trends</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our curated collection of premium products for every lifestyle.
            </p>
            
            {isClerkAvailable && (
              <SignedOut>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild size="lg" className="flex items-center gap-2">
                    <Link to="/sign-in">
                      <LogIn size={20} />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/sign-up">Create Account</Link>
                  </Button>
                </div>
              </SignedOut>
            )}
            
            <Button asChild size="lg">
              <Link to="/category/all">Shop Now</Link>
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
              alt="Hero image of products"
              className="rounded-xl shadow-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold tracking-wider">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Add CTA for signing up */}
      {isClerkAvailable && (
        <SignedOut>
          <section className="bg-gray-50 rounded-2xl py-12 px-8 mb-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Create an account to enjoy personalized shopping experiences, order tracking, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="flex items-center gap-2">
                <Link to="/sign-in">
                  <LogIn size={20} />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sign-up">Create Account</Link>
              </Button>
            </div>
          </section>
        </SignedOut>
      )}

      {/* Benefits Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Products</h3>
            <p className="text-gray-600">We source only the finest materials and products for our store.</p>
          </div>
          <div className="text-center p-6 rounded-lg border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">We ensure your orders are processed and delivered promptly.</p>
          </div>
          <div className="text-center p-6 rounded-lg border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-600">Your transactions are protected with state-of-the-art security.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
