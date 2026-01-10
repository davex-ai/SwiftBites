
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getImageUrl } from "../utils/image";
import Footer from "../components/Footer";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

const fetchCart = async () => {
  try {
    const { data } = await api.get("/my-cart");
    const cartArray = Array.isArray(data.cart) ? data.cart : [];
    setCartItems(cartArray);
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    toast.error("Unable to load cart");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 1500 : 0
  const tax = subtotal * 0.075
  const total = subtotal + shipping + tax;

  const updateQuantity = async (productId, newQuantity) => {
      console.log("Updating quantity:", { productId, newQuantity });
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      await api.patch(`/cart/${productId}`, { quantity: newQuantity });
      await fetchCart()
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.error("Failed to update quantity");
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete("/cart", { data: { productId } });
      await fetchCart();
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;
    
    try {
      await api.delete("/cart-clear");
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (err) {
      console.error("Failed to clear cart:", err);
      toast.error("Failed to clear cart");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-20 h-4 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 h-screen">
        <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#F53E32] text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="border-b last:border-b-0 p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={getImageUrl(item.product.images)}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                        <p className="text-gray-600">₦{item.product.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            className="w-8 h-8 rounded border flex items-center justify-center"
                            disabled={updating}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value) || 1)}
                            className="w-16 mx-2 border rounded text-center"
                            disabled={updating}
                          />
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            className="w-8 h-8 rounded border flex items-center justify-center"
                            disabled={updating}
                          >
                            +
                          </button>
                          
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                            disabled={updating}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={clearCart}
                  className="text-gray-600 hover:text-gray-800"
                  disabled={updating}
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
            

            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
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
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-[#F53E32] text-white py-3 rounded font-medium hover:bg-red-600 disabled:opacity-50"
                disabled={updating}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Cart;