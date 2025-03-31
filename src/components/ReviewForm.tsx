
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const reviewSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  comment: z.string().min(10, { message: "Review must be at least 10 characters" }).max(1000),
  recommended: z.boolean().default(false),
  rating: z.number().min(1, { message: "Please select a rating" }).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmitted, onCancel }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      comment: "",
      recommended: false,
      rating: 0,
    },
  });

  const selectedRating = form.watch("rating");

  const onSubmit = (data: ReviewFormValues) => {
    // Here we would typically send the data to an API
    console.log("Submitting review:", { productId, ...data });
    
    // For now, we'll just simulate a successful submission
    toast.success("Review submitted successfully", {
      description: "Thank you for your feedback!",
    });
    
    // Notify parent component that review was submitted
    onReviewSubmitted();
  };

  const renderStar = (rating: number) => {
    const isSelected = selectedRating >= rating;
    const isHovered = hoveredRating >= rating;
    
    return (
      <Star
        key={rating}
        size={24}
        className={`cursor-pointer transition-colors ${
          isSelected || isHovered ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
        onClick={() => form.setValue("rating", rating, { shouldValidate: true })}
        onMouseEnter={() => setHoveredRating(rating)}
        onMouseLeave={() => setHoveredRating(0)}
      />
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Rating Stars */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(renderStar)}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Review Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Title</FormLabel>
                <FormControl>
                  <Input placeholder="Summarize your experience" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Review Comment */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What did you like or dislike? How was your experience with this product?" 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Recommendation Checkbox */}
          <FormField
            control={form.control}
            name="recommended"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I recommend this product</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Submit Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
