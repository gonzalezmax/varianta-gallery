
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package, Truck, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We've received your order and will begin processing it right away.
          </p>
          <div className="bg-gray-50 rounded-md p-4 mb-6">
            <p className="font-medium">Order Number: #{orderNumber}</p>
            <p className="text-sm text-gray-500">A confirmation email has been sent to your email address.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
            <Button variant="outline" onClick={() => navigate("/account/orders")}>
              View Orders
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Package size={20} className="mr-2" />
              Order Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-medium">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span>{orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span>Visa •••• 1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Method</span>
                <span>Standard Shipping</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Truck size={20} className="mr-2" />
              Shipping Information
            </h2>
            <div className="space-y-2">
              <p className="font-medium">John Doe</p>
              <p>123 Main Street</p>
              <p>Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p className="mt-4 flex items-center text-gray-600">
                <Calendar size={16} className="mr-2" />
                <span>Estimated Delivery: {estimatedDelivery}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex py-3 border-b">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium">Premium Lightweight Running Shoes</h4>
                <div className="flex text-sm text-gray-500 mt-1">
                  <span className="mr-2">Color: Red</span>
                  <span>Size: 9</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm">Qty: 1</span>
                  <span className="font-medium">$129.99</span>
                </div>
              </div>
            </div>
            <div className="flex py-3 border-b">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium">Wireless Noise-Cancelling Headphones</h4>
                <div className="flex text-sm text-gray-500 mt-1">
                  <span>Color: Black</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm">Qty: 1</span>
                  <span className="font-medium">$249.99</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>$379.98</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>$26.60</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$406.58</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Package size={20} className="text-primary" />
              </div>
              <h3 className="font-medium mb-1">Order Processing</h3>
              <p className="text-sm text-gray-600">
                We're preparing your items for shipment.
              </p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck size={20} className="text-primary" />
              </div>
              <h3 className="font-medium mb-1">Shipping</h3>
              <p className="text-sm text-gray-600">
                You'll receive tracking info via email.
              </p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Home size={20} className="text-primary" />
              </div>
              <h3 className="font-medium mb-1">Delivery</h3>
              <p className="text-sm text-gray-600">
                Your order will arrive within 3-5 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
