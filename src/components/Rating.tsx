
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = "md",
  showText = false,
  className,
}) => {
  const starSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Generate an array of star states (full, half, empty)
  const stars = Array.from({ length: max }, (_, i) => {
    if (i < Math.floor(value)) return "full";
    if (i === Math.floor(value) && value % 1 >= 0.5) return "half";
    return "empty";
  });

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {stars.map((type, i) => (
          <Star
            key={i}
            size={starSizes[size]}
            className={cn(
              "text-yellow-400",
              type === "full" && "fill-yellow-400",
              type === "half" && "fill-gradient-to-r from-yellow-400 to-transparent",
              type === "empty" && "text-gray-300"
            )}
          />
        ))}
      </div>
      {showText && (
        <span className={cn("ml-1 font-medium", textSizes[size])}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
