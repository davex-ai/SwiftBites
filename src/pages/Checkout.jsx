// src/pages/Checkout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    address: user?.address || "",
    city: user?.city || "",
    phone: user?.phoneNo || "",
    paymentMethod: "cash" // Default to cash on delivery
  });

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await api.get("/my-cart");
        if (!data || data.length === 0) {
          toast.error("Your cart is empty");
          navigate("/cart");
          return;
        }
        setCartItems(data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        toast.error("Unable to load cart");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 1500 : 0;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.address || !formData.city || !formData.phone) {
      toast.error("Please fill in all shipping fields");
      return;
    }
    
    if (!/^\d{10,15}$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setSubmitting(true);
    
    try {
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }));

      // Create order
      const orderData = {
        orderItems,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          phone: formData.phone
        },
        totalAmount: total
      };

      const response = await api.post("/orders", orderData);
      
      // Clear cart after successful order
      await api.delete("/cart-clear");
      
      toast.success("Order placed successfully!");
      navigate(`/profile?order=${response.data._id}`);
    } catch (err) {
      console.error("Order failed:", err);
      const errorMsg = err.response?.data?.message || "Failed to place order. Please try again.";
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                      placeholder="08012345678"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="border border-gray-300 rounded p-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Cash on Delivery
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-[#F53E32] text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {submitting ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.product.name}
                  </span>
                  <span>₦{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₦{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7.5%)</span>
                <span>₦{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>₦{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
              <p className="font-medium">Cash on Delivery</p>
              <p>Pay when your order arrives</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;