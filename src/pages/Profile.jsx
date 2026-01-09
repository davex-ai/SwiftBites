// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { getAvatarUrl } from "../utils/avatar";
import { toast } from "react-hot-toast";

function formatDate(dateStr) {
  if (!dateStr) return "Unknown";
  
  let date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  if (isNaN(date.getTime())) return "Unknown";
  
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

function getStatusBadge(status) {
  const statusConfig = {
    pending: { text: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
    shipped: { text: 'Shipped', color: 'bg-blue-100 text-blue-800' },
    delivered: { text: 'Delivered', color: 'bg-green-100 text-green-800' },
    cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-800' }
  };
  
  return statusConfig[status] || statusConfig.pending;
}

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for new order from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newOrderId = params.get('order');
    if (newOrderId) {
      // Scroll to orders section
      setTimeout(() => {
        document.getElementById('orders-section')?.scrollIntoView({ behavior: 'smooth' });
        toast.success("Order placed successfully! See details below.");
      }, 500);
    }
  }, [location]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/my-orders');
        setOrders(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        toast.error("Failed to load orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const viewOrderDetails = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}`);
      setSelectedOrder(res.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Failed to fetch order details", err);
      toast.error("Failed to load order details");
    }
  };

  const goBackToOrders = () => {
    setSelectedOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) return null;

  const memberSince = formatDate(user.createdAt);
  const profilePic = getAvatarUrl(user);

  // Show order details view
  if (selectedOrder) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <button 
              onClick={goBackToOrders}
              className="text-blue-600 hover:underline flex items-center"
            >
              ← Back to Orders
            </button>
            <h1 className="text-2xl font-bold mt-2">Order Details</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3">Order Information</h3>
                <p><strong>Order ID:</strong> #{selectedOrder._id.slice(-6)}</p>
                <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusBadge(selectedOrder.delivered ? 'delivered' : 'pending').color}`}>
                    {getStatusBadge(selectedOrder.delivered ? 'delivered' : 'pending').text}
                  </span>
                </p>
                <p><strong>Total:</strong> ₦{selectedOrder.totalAmount.toFixed(2)}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Shipping Address</h3>
                <p>{selectedOrder.shippingAddress.fullName}</p>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}</p>
                <p>{selectedOrder.shippingAddress.phone}</p>
              </div>
            </div>
            
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="border rounded-lg overflow-hidden">
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className="flex p-4 border-b last:border-b-0">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
                  <div className="ml-4">
                    <h4 className="font-medium">{item.product?.name || 'Product name'}</h4>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="font-medium">₦{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between font-bold">
                <span>Subtotal</span>
                <span>₦{selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₦1,500.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>₦{selectedOrder.totalAmount.toFixed(2)}</span>
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
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <img
                src={profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4 object-cover border"
              />
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Account Information</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member since:</strong> {memberSince}</p>
              {user.googleId && <p><strong>Logged in via:</strong> Google</p>}
            </div>
          </div>

          {/* Order History */}
          <div className="md:col-span-2 bg-white p-4 rounded-lg shadow" id="orders-section">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Order History</h2>
              {orders.length > 0 && (
                <span className="text-sm text-gray-500">
                  {orders.length} order{orders.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex justify-between py-3 border-b">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-3">
                {orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map(order => {
                    const isDelivered = order.delivered;
                    const status = getStatusBadge(isDelivered ? 'delivered' : 'pending');
                    
                    return (
                      <div 
                        key={order._id} 
                        className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => viewOrderDetails(order._id)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Order #{order._id.slice(-6)}</p>
                            <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₦{order.totalAmount.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded ${status.color}`}>
                              {status.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders yet</p>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 flex gap-4">
          <a href="/wishlist" className="text-blue-600 hover:underline">My Wishlist</a>
          <a href="/cart" className="text-blue-600 hover:underline">My Cart</a>
        </div>
      </div>
    </>
  );
}

export default Profile;