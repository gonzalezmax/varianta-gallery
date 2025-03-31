
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="img-container aspect-[3/4] mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {(product.bestseller || product.onSale) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.bestseller && (
              <span className="bg-black text-white text-xs font-medium px-2 py-1">
                BESTSELLER
              </span>
            )}
            {product.onSale && (
              <span className="bg-red-600 text-white text-xs font-medium px-2 py-1">
                SALE {product.discount}% OFF
              </span>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        <div className="flex items-center space-x-2">
          {product.onSale ? (
            <>
              <span className="font-semibold">${(product.price * (1 - (product.discount ?? 0) / 100)).toFixed(2)}</span>
              <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center space-x-1">
            {product.colors.map((color) => (
              <div
                key={color.name}
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4} more</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
