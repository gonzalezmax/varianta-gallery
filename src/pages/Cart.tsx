
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Trash2, Plus, Minus, CreditCard, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleApplyPromo = () => {
    // Demo functionality - any code will give 10% off
    if (promoCode && !promoApplied) {
      setPromoApplied(true);
      setPromoDiscount(getCartTotal() * 0.1);
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 12.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax - promoDiscount;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Continue Shopping
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="p-6 border-b last:border-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-24 h-24 rounded-md overflow-hidden mb-4 sm:mb-0 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 sm:ml-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-medium text-lg">
                          <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        <div className="mt-1 mb-4 flex flex-wrap items-center gap-x-4 text-sm text-gray-500">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.size && <span>Size: {item.size}</span>}
                          <span>Price: ${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="w-8 h-8 flex items-center justify-center border-r"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="w-8 h-8 flex items-center justify-center border-l"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
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
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Promo Discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            <div className="mb-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  placeholder="Enter promo code"
                  className="w-full py-2 px-3 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button
                  onClick={handleApplyPromo}
                  disabled={promoApplied || !promoCode}
                  variant="secondary"
                  className="rounded-l-none"
                >
                  Apply
                </Button>
              </div>
              {promoApplied && (
                <p className="text-green-600 text-sm mt-1">
                  Promo code applied successfully!
                </p>
              )}
            </div>

            <Button className="w-full mb-4" onClick={() => navigate("/checkout")}>
              <CreditCard size={18} className="mr-2" />
              Proceed to Checkout
            </Button>

            <div className="text-sm text-gray-500 flex items-start space-x-2">
              <CircleHelp size={16} className="flex-shrink-0 mt-0.5" />
              <p>
                Free shipping on orders over $100. Easy returns within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
