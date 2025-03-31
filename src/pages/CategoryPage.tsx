
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, Grid3X3, Grid2X2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

enum ViewMode {
  Grid = "grid",
  List = "list",
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
];

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Grid);
  const [gridColumns, setGridColumns] = useState<2 | 3>(3);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Get unique brands from products
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

  // Filter products by category
  const filteredProducts = products.filter((product) => {
    // Filter by category (or show all if category is 'all')
    if (category !== "all" && product.category.toLowerCase() !== category?.toLowerCase()) {
      return false;
    }

    // Filter by selected brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "best-selling":
        return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      default:
        return 0;
    }
  });

  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    setSortBy("featured");
  };

  const getCategoryTitle = () => {
    if (!category) return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">Home</button>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{getCategoryTitle()}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{getCategoryTitle()}</h1>
        <p className="text-gray-500">{sortedProducts.length} Products</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          className="sm:hidden"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={16} className="mr-2" />
          Filters
        </Button>

        <div className="hidden sm:block">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === ViewMode.Grid && gridColumns === 3 ? "default" : "outline"}
              size="sm"
              className="px-2"
              onClick={() => {
                setViewMode(ViewMode.Grid);
                setGridColumns(3);
              }}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant={viewMode === ViewMode.Grid && gridColumns === 2 ? "default" : "outline"}
              size="sm"
              className="px-2"
              onClick={() => {
                setViewMode(ViewMode.Grid);
                setGridColumns(2);
              }}
            >
              <Grid2X2 size={16} />
            </Button>
            <Button
              variant={viewMode === ViewMode.List ? "default" : "outline"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode(ViewMode.List)}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-sm text-gray-600">Sort by:</div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className={`md:block ${filtersOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                className="text-sm text-primary hover:underline"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    className={`block text-sm w-full text-left py-1 hover:text-primary transition-colors ${
                      category?.toLowerCase() === cat.toLowerCase() || 
                      (category === "all" && cat === "All")
                        ? "text-primary font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <h3 className="font-medium mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrandFilter(brand)}
                    />
                    <Label 
                      htmlFor={`brand-${brand}`} 
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try changing your filters or check back later.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : viewMode === ViewMode.Grid ? (
            <div className={`grid grid-cols-2 ${gridColumns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm overflow-hidden border">
                  <div className="sm:w-56 h-60 sm:h-auto flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-medium text-lg hover:text-primary transition-colors">
                        <a href={`/product/${product.id}`}>{product.name}</a>
                      </h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    <p className="text-gray-700 mb-4 text-sm line-clamp-2">{product.description}</p>
                    <div className="flex items-center mt-auto">
                      <div className="flex items-center text-yellow-400 mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        {product.onSale ? (
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">
                              ${(product.price * (1 - (product.discount ?? 0) / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-semibold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button asChild>
                        <a href={`/product/${product.id}`}>View Product</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
