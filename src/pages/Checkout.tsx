
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, ShoppingBag, Truck, ChevronLeft, ChevronRight, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { useCart } from "@/context/CartContext";

enum CheckoutStep {
  Information = 0,
  Shipping = 1,
  Payment = 2,
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.Information);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const subtotal = getCartTotal();
  const shipping = shippingMethod === "express" ? 19.99 : (subtotal > 100 ? 0 : 12.99);
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleNextStep = () => {
    if (currentStep < CheckoutStep.Payment) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Simulate an order processing
      toast.loading("Processing your order...");
      
      setTimeout(() => {
        toast.dismiss();
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/order-confirmation");
      }, 2000);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > CheckoutStep.Information) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/cart");
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors mb-6"
      >
        <ChevronLeft size={16} className="mr-1" />
        Back to Cart
      </button>

      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${
              currentStep >= CheckoutStep.Information ? "bg-primary" : "bg-gray-300"
            }`}>
              {currentStep > CheckoutStep.Information ? (
                <CheckCircle2 size={20} />
              ) : (
                <span>1</span>
              )}
            </div>
            <span className="text-xs mt-2">Information</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${
            currentStep >= CheckoutStep.Shipping ? "bg-primary" : "bg-gray-300"
          }`} />
          <div className="flex flex-col items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${
              currentStep >= CheckoutStep.Shipping ? "bg-primary" : "bg-gray-300"
            }`}>
              {currentStep > CheckoutStep.Shipping ? (
                <CheckCircle2 size={20} />
              ) : (
                <span>2</span>
              )}
            </div>
            <span className="text-xs mt-2">Shipping</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${
            currentStep >= CheckoutStep.Payment ? "bg-primary" : "bg-gray-300"
          }`} />
          <div className="flex flex-col items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${
              currentStep >= CheckoutStep.Payment ? "bg-primary" : "bg-gray-300"
            }`}>
              <span>3</span>
            </div>
            <span className="text-xs mt-2">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {currentStep === CheckoutStep.Information && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="addressLine2">Apartment, suite, etc. (optional)</Label>
                    <Input id="addressLine2" placeholder="Apt 4B" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="United States" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === CheckoutStep.Shipping && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
                <RadioGroup 
                  value={shippingMethod} 
                  onValueChange={setShippingMethod}
                  className="space-y-3"
                >
                  <div className={`border rounded-lg p-4 relative ${
                    shippingMethod === "standard" ? "border-primary bg-primary/5" : ""
                  }`}>
                    <div className="flex items-center">
                      <RadioGroupItem value="standard" id="standard" className="mr-3" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Truck size={20} className="mr-3 text-gray-600" />
                            <div>
                              <p className="font-medium">Standard Shipping</p>
                              <p className="text-sm text-gray-500">3-5 business days</p>
                            </div>
                          </div>
                          <div className="font-medium">
                            {subtotal > 100 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              "$12.99"
                            )}
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className={`border rounded-lg p-4 relative ${
                    shippingMethod === "express" ? "border-primary bg-primary/5" : ""
                  }`}>
                    <div className="flex items-center">
                      <RadioGroupItem value="express" id="express" className="mr-3" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Truck size={20} className="mr-3 text-gray-600" />
                            <div>
                              <p className="font-medium">Express Shipping</p>
                              <p className="text-sm text-gray-500">1-2 business days</p>
                            </div>
                          </div>
                          <div className="font-medium">$19.99</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === CheckoutStep.Payment && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-3 mb-6"
                >
                  <div className={`border rounded-lg p-4 relative ${
                    paymentMethod === "credit" ? "border-primary bg-primary/5" : ""
                  }`}>
                    <div className="flex items-center">
                      <RadioGroupItem value="credit" id="credit" className="mr-3" />
                      <Label htmlFor="credit" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard size={20} className="mr-3 text-gray-600" />
                          <span className="font-medium">Credit / Debit Card</span>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className={`border rounded-lg p-4 relative ${
                    paymentMethod === "paypal" ? "border-primary bg-primary/5" : ""
                  }`}>
                    <div className="flex items-center">
                      <RadioGroupItem value="paypal" id="paypal" className="mr-3" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                            className="h-5 w-5 mr-3"
                            fill="#009cde"
                          >
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.473 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.53a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.484z" />
                          </svg>
                          <span className="font-medium">PayPal</span>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit" && (
                  <div className="space-y-4 mb-6 animate-fade-in">
                    <div>
                      <Label htmlFor="cardHolder">Card Holder Name</Label>
                      <Input id="cardHolder" placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Billing Address</h3>
                  <div className="flex items-center mb-4">
                    <input 
                      type="checkbox" 
                      id="sameAsShipping" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked 
                    />
                    <Label htmlFor="sameAsShipping" className="ml-2">
                      Same as shipping address
                    </Label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
              >
                <ChevronLeft size={16} className="mr-1" />
                {currentStep === CheckoutStep.Information ? "Back to Cart" : "Previous"}
              </Button>
              <Button onClick={handleNextStep}>
                {currentStep === CheckoutStep.Payment ? "Place Order" : "Continue"}
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="max-h-72 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex py-3 border-b last:border-0">
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                    <div className="flex text-sm text-gray-500 mt-1">
                      {item.color && <span className="mr-2">Color: {item.color}</span>}
                      {item.size && <span>Size: {item.size}</span>}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
