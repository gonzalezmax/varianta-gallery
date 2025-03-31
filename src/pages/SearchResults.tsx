
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (query) {
      const filteredProducts = products.filter((product) => {
        const searchLower = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      });
      setSearchResults(filteredProducts);
      setSearchQuery(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
            >
              <Search size={18} />
            </Button>
          </div>
          <Button variant="outline" type="button">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </form>
      </div>

      {query ? (
        <>
          <p className="text-muted-foreground mb-6">
            {searchResults.length} results found for "{query}"
          </p>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse our categories
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => setSearchParams({ q: "footwear" })}>
                  Footwear
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearchParams({ q: "electronics" })}>
                  Electronics
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearchParams({ q: "apparel" })}>
                  Apparel
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">Enter a search term to find products</h2>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
