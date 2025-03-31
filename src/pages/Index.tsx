
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter(product => product.bestseller).slice(0, 4);
  const onSaleProducts = products.filter(product => product.onSale).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Quality Products for Every Lifestyle</h1>
              <p className="text-lg text-gray-600 mb-8">
                Browse our curated collection of premium products designed to enhance your everyday experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/category/all">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/category/bestsellers">View Bestsellers</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" 
                  alt="Product showcase" 
                  className="rounded-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Product showcase" 
                  className="rounded-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop" 
                  alt="Product showcase" 
                  className="rounded-lg object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1972&auto=format&fit=crop" 
                  alt="Product showcase" 
                  className="rounded-lg object-cover h-64 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <Link 
                key={category} 
                to={`/category/${category.toLowerCase()}`}
                className="group"
              >
                <div className="img-container aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-4xl group-hover:text-primary transition-colors">
                    {getCategoryIcon(category)}
                  </div>
                </div>
                <h3 className="text-center font-medium group-hover:text-primary transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link 
              to="/category/all" 
              className="text-primary flex items-center hover:underline"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2072&auto=format&fit=crop"
                alt="Premium Footwear Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Premium Footwear Collection</h3>
                <p className="text-white/90 mb-4">Discover the perfect shoes for every occasion</p>
                <Button asChild variant="outline" className="bg-white/20 text-white hover:bg-white hover:text-black border-white w-fit">
                  <Link to="/category/footwear">Shop Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2064&auto=format&fit=crop"
                alt="Tech Accessories"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Tech Accessories</h3>
                <p className="text-white/90 mb-4">Enhance your digital lifestyle with our premium tech</p>
                <Button asChild variant="outline" className="bg-white/20 text-white hover:bg-white hover:text-black border-white w-fit">
                  <Link to="/category/electronics">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Bestsellers</h2>
            <Link 
              to="/category/bestsellers" 
              className="text-primary flex items-center hover:underline"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {onSaleProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">Special Offers</h2>
              <p className="text-gray-600">Limited time deals on premium products</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild className="mt-6">
                <Link to="/category/all" className="flex items-center">
                  Browse All Deals <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-primary"
                >
                  <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                  <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-500 text-sm">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-primary"
                >
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"></path>
                  <path d="M19 10v2a7 7 0 01-14 0v-2M12 18.5v.5m0 0v.5m0-.5h.5m-.5 0h-.5"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-500 text-sm">Dedicated customer service</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-primary"
                >
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Secure Checkout</h3>
              <p className="text-gray-500 text-sm">100% protected payments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-primary"
                >
                  <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  <path d="M18 14l-4-4l-6 6"></path>
                  <path d="M15 11l4.4-4.4a1.4 1.4 0 00-2-2L13 9"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-500 text-sm">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Stay updated with the latest products, exclusive offers, and more.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get category icons
function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'footwear':
      return '👟';
    case 'apparel':
      return '👕';
    case 'electronics':
      return '🎧';
    case 'accessories':
      return '👜';
    case 'home':
      return '🏠';
    default:
      return '📦';
  }
}

export default Index;
