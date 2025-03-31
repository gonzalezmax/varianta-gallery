import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { X, Upload, Trash2, Plus, Minus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/data/products";
import { Card } from "@/components/ui/card";

// Define form schema with Zod
const productFormSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Please select a category" }),
  brand: z.string().min(1, { message: "Brand name is required" }),
  stock: z.coerce.number().int().positive({ message: "Stock must be a positive number" }),
  bestseller: z.boolean().default(false),
  onSale: z.boolean().default(false),
  discount: z.coerce.number().int().min(0).max(100).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

type ColorInput = {
  name: string;
  hex: string;
};

type SizeInput = {
  value: string;
};

type TagInput = {
  value: string;
};

const AddProduct = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorInput[]>([{ name: "", hex: "#000000" }]);
  const [sizes, setSizes] = useState<SizeInput[]>([{ value: "" }]);
  const [tags, setTags] = useState<TagInput[]>([{ value: "" }]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      brand: "",
      stock: 1,
      bestseller: false,
      onSale: false,
      discount: 0,
    },
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews: string[] = [];
      
      // Generate previews for new files
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string);
            if (newPreviews.length === newFiles.length) {
              setImagePreviews(prev => [...prev, ...newPreviews]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
      
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Update color input
  const updateColor = (index: number, field: keyof ColorInput, value: string) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  // Add a new color input
  const addColor = () => {
    setColors(prev => [...prev, { name: "", hex: "#000000" }]);
  };

  // Remove a color input
  const removeColor = (index: number) => {
    if (colors.length > 1) {
      setColors(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Update size input
  const updateSize = (index: number, value: string) => {
    const newSizes = [...sizes];
    newSizes[index].value = value;
    setSizes(newSizes);
  };

  // Add a new size input
  const addSize = () => {
    setSizes(prev => [...prev, { value: "" }]);
  };

  // Remove a size input
  const removeSize = (index: number) => {
    if (sizes.length > 1) {
      setSizes(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Update tag input
  const updateTag = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index].value = value;
    setTags(newTags);
  };

  // Add a new tag input
  const addTag = () => {
    setTags(prev => [...prev, { value: "" }]);
  };

  // Remove a tag input
  const removeTag = (index: number) => {
    if (tags.length > 1) {
      setTags(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Form submission handler
  const onSubmit = async (data: ProductFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add a product",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please add at least one product image",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Insert product data
      const { data: productData, error: productError } = await supabase
        .from("user_products")
        .insert({
          user_id: user.id,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          brand: data.brand,
          stock: data.stock,
          bestseller: data.bestseller,
          on_sale: data.onSale,
          discount: data.onSale ? data.discount : null,
          rating: 0,
          review_count: 0
        })
        .select();

      if (productError || !productData) {
        throw new Error(productError?.message || "Failed to create product");
      }

      const productId = productData[0].id;

      // Upload images
      const imageUrls = await Promise.all(
        images.map(async (file, index) => {
          const fileExt = file.name.split(".").pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = `${productId}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(filePath, file);

          if (uploadError) {
            throw new Error(`Failed to upload image: ${uploadError.message}`);
          }

          const { data: urlData } = supabase.storage
            .from("product-images")
            .getPublicUrl(filePath);

          return { url: urlData.publicUrl, order: index };
        })
      );

      // Insert image records
      const { error: imagesError } = await supabase
        .from("product_images")
        .insert(
          imageUrls.map((img, index) => ({
            product_id: productId,
            image_url: img.url,
            sort_order: index,
          }))
        );

      if (imagesError) {
        throw new Error(`Failed to store image records: ${imagesError.message}`);
      }

      // Insert color records (filter out empty values)
      const validColors = colors.filter(color => color.name.trim() !== "" && color.hex.trim() !== "");
      if (validColors.length > 0) {
        const { error: colorsError } = await supabase
          .from("product_colors")
          .insert(
            validColors.map(color => ({
              product_id: productId,
              name: color.name,
              hex: color.hex,
            }))
          );

        if (colorsError) {
          throw new Error(`Failed to store color records: ${colorsError.message}`);
        }
      }

      // Insert size records (filter out empty values)
      const validSizes = sizes.filter(size => size.value.trim() !== "");
      if (validSizes.length > 0) {
        const { error: sizesError } = await supabase
          .from("product_sizes")
          .insert(
            validSizes.map(size => ({
              product_id: productId,
              size: size.value,
            }))
          );

        if (sizesError) {
          throw new Error(`Failed to store size records: ${sizesError.message}`);
        }
      }

      // Insert tag records (filter out empty values)
      const validTags = tags.filter(tag => tag.value.trim() !== "");
      if (validTags.length > 0) {
        const { error: tagsError } = await supabase
          .from("product_tags")
          .insert(
            validTags.map(tag => ({
              product_id: productId,
              tag: tag.value,
            }))
          );

        if (tagsError) {
          throw new Error(`Failed to store tag records: ${tagsError.message}`);
        }
      }

      toast({
        title: "Product added successfully",
        description: "Your product has been added to the marketplace",
      });

      // Redirect to the product detail page
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Failed to add product",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Add Your Product</h1>

      <SignedIn>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column - Basic information */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Premium Running Shoes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your product in detail..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.filter(cat => cat !== "All").map((category) => (
                              <SelectItem key={category} value={category.toLowerCase()}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Nike" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bestseller"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Mark as Bestseller</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="onSale"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>On Sale</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("onSale") && (
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Percentage: {field.value}%</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[field.value || 0]}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Right column - Images and options */}
              <div className="space-y-6">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Product Images</h3>
                    <p className="text-sm text-gray-500 mb-4">Add up to 5 images of your product</p>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      {imagePreviews.map((preview, index) => (
                        <div 
                          key={index} 
                          className="relative w-24 h-24 border rounded overflow-hidden group"
                        >
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}

                      {imagePreviews.length < 5 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded hover:border-primary transition-colors"
                        >
                          <Upload size={24} className="text-gray-400" />
                        </button>
                      )}
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="hidden"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={imagePreviews.length >= 5}
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload Images
                    </Button>
                  </div>
                </div>

                {/* Colors Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Available Colors</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addColor}
                        disabled={colors.length >= 5}
                      >
                        <Plus size={16} className="mr-1" /> Add Color
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {colors.map((color, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <Input
                            placeholder="Color name"
                            value={color.name}
                            onChange={(e) => updateColor(index, "name", e.target.value)}
                            className="flex-grow"
                          />
                          <Input
                            type="color"
                            value={color.hex}
                            onChange={(e) => updateColor(index, "hex", e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeColor(index)}
                            disabled={colors.length <= 1}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sizes Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Available Sizes</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addSize}
                        disabled={sizes.length >= 10}
                      >
                        <Plus size={16} className="mr-1" /> Add Size
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {sizes.map((size, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <Input
                            placeholder="Size (e.g. S, M, L, XL, 42, 8.5)"
                            value={size.value}
                            onChange={(e) => updateSize(index, e.target.value)}
                            className="flex-grow"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSize(index)}
                            disabled={sizes.length <= 1}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags Section */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Product Tags</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addTag}
                        disabled={tags.length >= 5}
                      >
                        <Plus size={16} className="mr-1" /> Add Tag
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {tags.map((tag, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <Input
                            placeholder="Tag (e.g. sports, summer, casual)"
                            value={tag.value}
                            onChange={(e) => updateTag(index, e.target.value)}
                            className="flex-grow"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTag(index)}
                            disabled={tags.length <= 1}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding Product..." : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-md p-4">
          <h3 className="font-medium text-amber-800 mb-2">Need product inspiration?</h3>
          <p className="text-sm text-amber-700">
            High-quality product listings with clear images and detailed descriptions tend to sell better.
            Make sure to include all relevant information like materials, dimensions, and usage instructions.
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to add your product</h2>
          <p className="mb-6 text-gray-600">
            You need to be signed in to add products to the marketplace.
          </p>
          <Button asChild>
            <a href="/sign-in">Sign In or Create Account</a>
          </Button>
        </Card>
      </SignedOut>
    </div>
  );
};

export default AddProduct;
