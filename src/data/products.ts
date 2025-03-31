
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  tags?: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  bestseller?: boolean;
  onSale?: boolean;
  discount?: number;
};

export type Review = {
  id: string;
  productId: string;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  recommended: boolean;
  verified: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Lightweight Running Shoes",
    description: "Ultra-lightweight running shoes designed for maximum comfort and performance. The breathable mesh upper and responsive cushioning provide a smooth ride, while the durable rubber outsole delivers reliable traction for any running surface.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop"
    ],
    category: "Footwear",
    brand: "AthleteX",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Red", hex: "#E53E3E" },
      { name: "Blue", hex: "#3182CE" },
      { name: "Black", hex: "#2D3748" },
      { name: "White", hex: "#F7FAFC" }
    ],
    tags: ["running", "athletic", "lightweight"],
    rating: 4.7,
    reviewCount: 128,
    stock: 45,
    bestseller: true
  },
  {
    id: "p2",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation technology. Experience immersive sound with deep bass and crystal-clear highs. The comfortable over-ear design and long battery life make these perfect for all-day listening.",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1935&auto=format&fit=crop"
    ],
    category: "Electronics",
    brand: "SoundWave",
    colors: [
      { name: "Black", hex: "#2D3748" },
      { name: "Silver", hex: "#CBD5E0" },
      { name: "Rose Gold", hex: "#ED8796" }
    ],
    tags: ["audio", "wireless", "noise-cancelling"],
    rating: 4.8,
    reviewCount: 342,
    stock: 28
  },
  {
    id: "p3",
    name: "Classic Leather Jacket",
    description: "Timeless leather jacket crafted from premium full-grain leather. The classic design features a tailored fit, multiple pockets, and durable hardware. This versatile jacket only gets better with age and is perfect for any season.",
    price: 329.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1992&auto=format&fit=crop"
    ],
    category: "Apparel",
    brand: "UrbanEdge",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Brown", hex: "#795548" },
      { name: "Black", hex: "#2D3748" }
    ],
    tags: ["leather", "jacket", "outerwear"],
    rating: 4.9,
    reviewCount: 87,
    stock: 12,
    bestseller: true
  },
  {
    id: "p4",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with built-in GPS, heart rate monitoring, and sleep analysis. Track your workouts, receive notifications, and control your music all from your wrist. Water-resistant design with a bright, customizable display.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Electronics",
    brand: "TechFit",
    colors: [
      { name: "Black", hex: "#2D3748" },
      { name: "Blue", hex: "#3182CE" },
      { name: "Pink", hex: "#ED64A6" }
    ],
    tags: ["fitness", "smartwatch", "wearable"],
    rating: 4.5,
    reviewCount: 215,
    stock: 32,
    onSale: true,
    discount: 15
  },
  {
    id: "p5",
    name: "Minimalist Leather Backpack",
    description: "Elegant backpack combining minimalist design with practical functionality. Made from high-quality leather with adjustable straps and multiple compartments, including a padded laptop sleeve. Perfect for work, travel, or everyday use.",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1969&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "Accessories",
    brand: "UrbanEdge",
    colors: [
      { name: "Tan", hex: "#D69E2E" },
      { name: "Brown", hex: "#795548" },
      { name: "Black", hex: "#2D3748" }
    ],
    tags: ["backpack", "leather", "minimalist"],
    rating: 4.6,
    reviewCount: 74,
    stock: 18
  },
  {
    id: "p6",
    name: "Ultra HD Smart TV - 55\"",
    description: "Immersive 55-inch 4K Ultra HD display with vibrant colors and deep contrast. Smart functionality gives you access to thousands of streaming apps. Voice control compatibility and multiple HDMI inputs for all your devices.",
    price: 799.99,
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571415060716-baff5f675ba5?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop"
    ],
    category: "Electronics",
    brand: "VisionTech",
    tags: ["tv", "smart", "4k", "entertainment"],
    rating: 4.7,
    reviewCount: 189,
    stock: 7,
    onSale: true,
    discount: 10
  },
  {
    id: "p7",
    name: "Premium Coffee Maker",
    description: "Professional-grade coffee maker with customizable brewing options. Temperature control technology ensures optimal extraction, while the built-in grinder provides fresh grounds for each brew. Modern design with stainless steel accents.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1520970519539-8ce4deb4ee68?q=80&w=1968&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556229256-8a801b9c4e1a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571067348636-5c1c3b6e66ba?q=80&w=1973&auto=format&fit=crop"
    ],
    category: "Home",
    brand: "KitchenLux",
    colors: [
      { name: "Silver", hex: "#CBD5E0" },
      { name: "Black", hex: "#2D3748" },
      { name: "White", hex: "#F7FAFC" }
    ],
    tags: ["coffee", "kitchen", "appliance"],
    rating: 4.4,
    reviewCount: 142,
    stock: 23
  },
  {
    id: "p8",
    name: "Designer Sunglasses",
    description: "Stylish sunglasses with 100% UV protection and polarized lenses to reduce glare. The lightweight frame design provides all-day comfort, while the classic styling complements any outfit. Includes a protective case and microfiber cloth.",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1980&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546482545-1bc85867db9c?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625591342274-013866180476?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "Accessories",
    brand: "LuxeView",
    colors: [
      { name: "Black", hex: "#2D3748" },
      { name: "Tortoise", hex: "#A87339" }
    ],
    tags: ["sunglasses", "accessories", "fashion"],
    rating: 4.8,
    reviewCount: 58,
    stock: 15,
    bestseller: true
  }
];

// Initial/default reviews
const defaultReviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userName: "Sarah J.",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "2023-10-15",
    title: "Best running shoes I've ever owned",
    comment: "These shoes are incredible! They're so lightweight yet provide amazing support. I've been running for years and these are by far the most comfortable shoes I've worn. Worth every penny!",
    recommended: true,
    verified: true
  },
  {
    id: "r2",
    productId: "p1",
    userName: "Michael T.",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    date: "2023-09-28",
    title: "Great for daily runs",
    comment: "I've been using these for about a month now for my daily 5k runs. They're holding up great and provide good arch support. The only reason I'm giving 4 stars instead of 5 is that they run slightly narrow.",
    recommended: true,
    verified: true
  },
  {
    id: "r3",
    productId: "p1",
    userName: "David W.",
    userImage: "https://randomuser.me/api/portraits/men/68.jpg",
    rating: 5,
    date: "2023-11-02",
    title: "Perfect for marathon training",
    comment: "These shoes have been a game changer for my marathon training. The cushioning is perfect - supportive without being too soft. I've put over 100 miles on them and they still look and feel great.",
    recommended: true,
    verified: true
  },
  {
    id: "r4",
    productId: "p1",
    userName: "Jennifer K.",
    userImage: "https://randomuser.me/api/portraits/women/62.jpg",
    rating: 4,
    date: "2023-10-05",
    title: "Stylish and functional",
    comment: "Not only are these shoes great for running, but they look amazing too! I get compliments on them all the time. The only downside is that the white version gets dirty easily, but that's to be expected.",
    recommended: true,
    verified: true
  },
  {
    id: "r5",
    productId: "p1",
    userName: "Robert L.",
    userImage: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    date: "2023-09-15",
    title: "Great for wide feet",
    comment: "I usually struggle to find running shoes that fit my wide feet comfortably, but these are perfect! No break-in period needed and no blisters. I'll definitely be buying another pair when these wear out.",
    recommended: true,
    verified: true
  }
];

export const categories = [
  "All",
  "Footwear",
  "Apparel",
  "Electronics",
  "Accessories",
  "Home"
];

// Get reviews from Supabase
const getReviews = async (): Promise<Review[]> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*');
    
    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
    
    return data.map((review: any) => ({
      id: review.id,
      productId: review.product_id,
      userName: review.user_name,
      userImage: review.user_image,
      rating: review.rating,
      date: review.date,
      title: review.title,
      comment: review.comment,
      recommended: review.recommended,
      verified: review.verified
    }));
  } catch (error) {
    console.error('Error in getReviews:', error);
    return [];
  }
};

// Add a new review to Supabase
export const addReview = async (review: Review): Promise<Review[]> => {
  try {
    const { error } = await supabase
      .from('reviews')
      .insert([{
        product_id: review.productId,
        user_name: review.userName,
        user_image: review.userImage,
        rating: review.rating,
        date: review.date,
        title: review.title,
        comment: review.comment,
        recommended: review.recommended,
        verified: review.verified
      }]);
    
    if (error) {
      console.error('Error adding review:', error);
      return [];
    }
    
    // After inserting, get all reviews again to return the updated list
    return getProductReviews(review.productId);
  } catch (error) {
    console.error('Error in addReview:', error);
    return [];
  }
};

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, limit);
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching product reviews:', error);
      return [];
    }
    
    return data.map((review: any) => ({
      id: review.id,
      productId: review.product_id,
      userName: review.user_name,
      userImage: review.user_image,
      rating: review.rating,
      date: review.date,
      title: review.title,
      comment: review.comment,
      recommended: review.recommended,
      verified: review.verified
    }));
  } catch (error) {
    console.error('Error in getProductReviews:', error);
    return [];
  }
}

// Helper function to recalculate product rating based on reviews
export async function recalculateProductRating(productId: string): Promise<number> {
  const productReviews = await getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  
  const sum = productReviews.reduce((total, review) => total + review.rating, 0);
  return parseFloat((sum / productReviews.length).toFixed(1));
}
