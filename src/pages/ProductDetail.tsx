import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Truck, Shield, RotateCcw, ChevronRight, ChevronDown, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getProductById, getProductReviews, getRelatedProducts, addReview, Review } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Rating from "@/components/Rating";
import ReviewForm from "@/components/ReviewForm";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = id ? getProductById(id) : undefined;
  const initialReviews = id ? getProductReviews(id) : [];
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const relatedProducts = product ? getRelatedProducts(product, 4) : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (id) {
      setReviews(getProductReviews(id));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.onSale 
          ? product.price * (1 - (product.discount ?? 0) / 100) 
          : product.price,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
      }, quantity);
      
      toast("Added to cart", {
        description: `${quantity} × ${product.name} added to your cart`,
        action: {
          label: "View Cart",
          onClick: () => navigate("/cart"),
        },
      });
    }
  };

  const handleReviewSubmitted = (newReview: Review) => {
    const updatedReviews = addReview(newReview);
    setReviews(updatedReviews.filter(review => review.productId === id));
    setShowReviewForm(false);
    
    toast.success("Review submitted successfully", {
      description: "Your review has been saved and will be visible even after refreshing the page.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">Home</button>
        <ChevronRight size={16} className="mx-2" />
        <button onClick={() => navigate(`/category/${product.category.toLowerCase()}`)} className="hover:text-primary transition-colors">{product.category}</button>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {(product.bestseller || product.onSale) && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.bestseller && (
                  <span className="bg-black text-white text-xs font-semibold px-2 py-1">
                    BESTSELLER
                  </span>
                )}
                {product.onSale && (
                  <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1">
                    SALE {product.discount}% OFF
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              <Rating value={product.rating} showText size="md" />
              <span className="mx-2 text-gray-500">|</span>
              <button className="text-sm text-gray-500 hover:text-primary transition-colors">
                {product.reviewCount} Reviews
              </button>
            </div>
            <div className="flex items-baseline mb-4">
              {product.onSale ? (
                <>
                  <span className="text-2xl font-bold mr-2">${(product.price * (1 - (product.discount ?? 0) / 100)).toFixed(2)}</span>
                  <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Color: {selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        selectedColor === color.name
                          ? "border-gray-900"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <div className="w-5 h-5 rounded-full bg-white/30" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Size: {selectedSize}</span>
                  <button className="text-sm text-primary">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`py-2 border font-medium text-center rounded-md transition-colors ${
                        selectedSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  className="w-10 h-12 flex items-center justify-center text-lg border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-medium">
                  {quantity}
                </span>
                <button
                  className="w-10 h-12 flex items-center justify-center text-lg border-l"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <Button 
                className="w-full sm:flex-1 h-12" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart size={20} />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 size={20} />
              </Button>
            </div>
            
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                  In Stock - {product.stock} items available
                </p>
              ) : (
                <p className="text-red-600 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                  Out of Stock
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Truck size={18} className="text-gray-600 mr-3" />
                <span className="text-sm">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <Shield size={18} className="text-gray-600 mr-3" />
                <span className="text-sm">2-year warranty</span>
              </div>
              <div className="flex items-center">
                <RotateCcw size={18} className="text-gray-600 mr-3" />
                <span className="text-sm">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger 
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-5 font-medium"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-5 font-medium"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-5 font-medium"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p className="mb-4">
                {product.description}
              </p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                augue in odio fermentum, vel fringilla justo imperdiet. Fusce
                facilisis massa sed sem blandit, id commodo velit vehicula. Etiam ut
                purus vel nulla fermentum venenatis. Integer tempus orci vel eros
                cursus, vel sodales tellus placerat.
              </p>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Premium quality materials for durability</li>
                <li>Innovative design for optimal performance</li>
                <li>Comfortable and ergonomic construction</li>
                <li>Versatile functionality for everyday use</li>
                <li>Sleek and modern aesthetic</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Product Details</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-1/3 text-gray-600">Brand</span>
                    <span className="w-2/3 font-medium">{product.brand}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/3 text-gray-600">Category</span>
                    <span className="w-2/3 font-medium">{product.category}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/3 text-gray-600">SKU</span>
                    <span className="w-2/3 font-medium">{product.id.toUpperCase()}</span>
                  </div>
                  {product.colors && (
                    <div className="flex">
                      <span className="w-1/3 text-gray-600">Colors</span>
                      <span className="w-2/3 font-medium">{product.colors.map(c => c.name).join(", ")}</span>
                    </div>
                  )}
                  {product.sizes && (
                    <div className="flex">
                      <span className="w-1/3 text-gray-600">Sizes</span>
                      <span className="w-2/3 font-medium">{product.sizes.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Dimensions & Weight</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-1/3 text-gray-600">Weight</span>
                    <span className="w-2/3 font-medium">0.5 kg</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/3 text-gray-600">Dimensions</span>
                    <span className="w-2/3 font-medium">25 × 10 × 15 cm</span>
                  </div>
                </div>
                
                <h3 className="font-semibold mt-6 mb-3">Shipping Information</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-1/3 text-gray-600">Shipping</span>
                    <span className="w-2/3 font-medium">Free on orders over $100</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/3 text-gray-600">Delivery</span>
                    <span className="w-2/3 font-medium">2-5 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <Rating value={product.rating} showText size="lg" />
                    <span className="ml-2 text-gray-500">Based on {reviews.length} reviews</span>
                  </div>
                </div>
                <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                  {showReviewForm ? "Cancel Review" : "Write a Review"}
                </Button>
              </div>
              
              {showReviewForm && (
                <div className="mb-8">
                  <ReviewForm 
                    productId={product.id} 
                    onReviewSubmitted={handleReviewSubmitted}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              )}
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        {review.userImage ? (
                          <img
                            src={review.userImage}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {review.userName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium">{review.userName}</h4>
                          <div className="flex items-center mt-1">
                            <Rating value={review.rating} size="sm" />
                            {review.verified && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <h5 className="font-semibold mt-3 mb-1">{review.title}</h5>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    {review.recommended && (
                      <div className="flex items-center text-green-600 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>I recommend this product</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">You Might Also Like</h2>
          <Button variant="outline" onClick={() => navigate("/category/all")}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
