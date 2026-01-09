import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { getAvatarUrl } from "../utils/avatar";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaCalendar, FaShoppingBag, FaHeart, FaShoppingCart, FaArrowLeft, FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
    pending: { 
      text: 'Processing', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: <FaBox />
    },
    shipped: { 
      text: 'Shipped', 
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: <FaTruck />
    },
    delivered: { 
      text: 'Delivered', 
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: <FaCheckCircle />
    },
    cancelled: { 
      text: 'Cancelled', 
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: <FaTimesCircle />
    }
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Check for new order from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newOrderId = params.get('order');
    if (newOrderId) {
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

  // Show order details view with animations
  if (selectedOrder) {
    const status = getStatusBadge(selectedOrder.delivered ? 'delivered' : 'pending');
    
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6 animate-fadeIn">
          <div className="mb-6 transform transition-all duration-500 hover:translate-x-2">
            <button 
              onClick={goBackToOrders}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Orders</span>
            </button>
            <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Order Details
            </h1>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl transform transition-all duration-300 hover:scale-105">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <FaShoppingBag className="text-blue-600" />
                  Order Information
                </h3>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">#{selectedOrder._id.slice(-6)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{formatDate(selectedOrder.createdAt)}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${status.color} animate-pulse`}>
                      {status.icon}
                      {status.text}
                    </span>
                  </p>
                  <p className="flex justify-between text-lg">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-green-600">₦{selectedOrder.totalAmount.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl transform transition-all duration-300 hover:scale-105">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <FaTruck className="text-green-600" />
                  Shipping Address
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">{selectedOrder.shippingAddress.fullName}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>{selectedOrder.shippingAddress.city}</p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-green-600" />
                    {selectedOrder.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FaBox className="text-purple-600" />
              Order Items
            </h3>
            <div className="border-2 border-gray-100 rounded-xl overflow-hidden">
              {selectedOrder.orderItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 transform transition-transform duration-300 hover:rotate-3"></div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-lg">{item.product?.name || 'Product name'}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-bold text-green-600 mt-1">₦{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₦{selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">₦1,500.00</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="flex justify-between font-bold text-xl text-gray-900 pt-2">
                  <span>Total</span>
                  <span className="text-green-600">₦{selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
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
      
      <div className={`container mx-auto px-4 py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fadeIn">
          My Profile
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-slideInLeft">
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                />
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              <h2 className="font-bold text-xl mt-4">{user.name}</h2>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <FaEnvelope className="text-blue-500" />
                {user.email}
              </p>
            </div>

            <div className="border-t-2 border-gray-100 pt-6 space-y-4">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg transform transition-all duration-300 hover:translate-x-2">
                  <FaUser className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg transform transition-all duration-300 hover:translate-x-2">
                  <FaEnvelope className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg transform transition-all duration-300 hover:translate-x-2">
                  <FaCalendar className="text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500">Member since</p>
                    <p className="font-semibold">{memberSince}</p>
                  </div>
                </div>
                {user.googleId && (
                  <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">Logged in via:</span> Google
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl animate-slideInRight" id="orders-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl flex items-center gap-2">
                <FaShoppingBag className="text-blue-600" />
                Order History
              </h2>
              {orders.length > 0 && (
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold animate-bounce">
                  {orders.length} order{orders.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse p-4 border-2 border-gray-100 rounded-xl">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((order, index) => {
                    const isDelivered = order.delivered;
                    const statusInfo = getStatusBadge(isDelivered ? 'delivered' : 'pending');
                    
                    return (
                      <div 
                        key={order._id} 
                        className="p-5 border-2 border-gray-100 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 animate-fadeInUp"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => viewOrderDetails(order._id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="space-y-2">
                            <p className="font-bold text-lg flex items-center gap-2">
                              <FaBox className="text-blue-600" />
                              Order #{order._id.slice(-6)}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <FaCalendar className="text-gray-400" />
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="font-bold text-xl text-green-600">₦{order.totalAmount.toFixed(2)}</p>
                            <span className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border font-medium ${statusInfo.color}`}>
                              {statusInfo.icon}
                              {statusInfo.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <FaShoppingBag className="text-5xl text-blue-500" />
                </div>
                <p className="text-gray-500 text-lg mb-4">No orders yet</p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex gap-6 justify-center animate-fadeIn">
          <a 
            href="/wishlist" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <FaHeart />
            My Wishlist
          </a>
          <a 
            href="/cart" 
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-semibold transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <FaShoppingCart />
            My Cart
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}

export default Profile;


// // src/pages/Profile.jsx
// import { useAuth } from "../context/AuthContext";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../api/axios";
// import Navbar from "../components/Navbar";
// import { getAvatarUrl } from "../utils/avatar";
// import { toast } from "react-toastify";

// function formatDate(dateStr) {
//   if (!dateStr) return "Unknown";
  
//   let date = dateStr instanceof Date ? dateStr : new Date(dateStr);
//   if (isNaN(date.getTime())) return "Unknown";
  
//   return new Intl.DateTimeFormat('en-GB', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric'
//   }).format(date);
// }

// function getStatusBadge(status) {
//   const statusConfig = {
//     pending: { text: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
//     shipped: { text: 'Shipped', color: 'bg-blue-100 text-blue-800' },
//     delivered: { text: 'Delivered', color: 'bg-green-100 text-green-800' },
//     cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-800' }
//   };
  
//   return statusConfig[status] || statusConfig.pending;
// }

// function Profile() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check for new order from URL params
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const newOrderId = params.get('order');
//     if (newOrderId) {
//       // Scroll to orders section
//       setTimeout(() => {
//         document.getElementById('orders-section')?.scrollIntoView({ behavior: 'smooth' });
//         toast.success("Order placed successfully! See details below.");
//       }, 500);
//     }
//   }, [location]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await api.get('/my-orders');
//         setOrders(res.data || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch orders", err);
//         toast.error("Failed to load orders");
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const viewOrderDetails = async (orderId) => {
//     try {
//       const res = await api.get(`/orders/${orderId}`);
//       setSelectedOrder(res.data);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } catch (err) {
//       console.error("Failed to fetch order details", err);
//       toast.error("Failed to load order details");
//     }
//   };

//   const goBackToOrders = () => {
//     setSelectedOrder(null);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (!user) return null;

//   const memberSince = formatDate(user.createdAt);
//   const profilePic = getAvatarUrl(user);

//   // Show order details view
//   if (selectedOrder) {
//     return (
//       <>
//         <Navbar />
//         <div className="container mx-auto px-4 py-6">
//           <div className="mb-6">
//             <button 
//               onClick={goBackToOrders}
//               className="text-blue-600 hover:underline flex items-center"
//             >
//               ← Back to Orders
//             </button>
//             <h1 className="text-2xl font-bold mt-2">Order Details</h1>
//           </div>
          
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="font-semibold mb-3">Order Information</h3>
//                 <p><strong>Order ID:</strong> #{selectedOrder._id.slice(-6)}</p>
//                 <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
//                 <p><strong>Status:</strong> 
//                   <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusBadge(selectedOrder.delivered ? 'delivered' : 'pending').color}`}>
//                     {getStatusBadge(selectedOrder.delivered ? 'delivered' : 'pending').text}
//                   </span>
//                 </p>
//                 <p><strong>Total:</strong> ₦{selectedOrder.totalAmount.toFixed(2)}</p>
//               </div>
              
//               <div>
//                 <h3 className="font-semibold mb-3">Shipping Address</h3>
//                 <p>{selectedOrder.shippingAddress.fullName}</p>
//                 <p>{selectedOrder.shippingAddress.address}</p>
//                 <p>{selectedOrder.shippingAddress.city}</p>
//                 <p>{selectedOrder.shippingAddress.phone}</p>
//               </div>
//             </div>
            
//             <h3 className="font-semibold mb-3">Order Items</h3>
//             <div className="border rounded-lg overflow-hidden">
//               {selectedOrder.orderItems.map((item, index) => (
//                 <div key={index} className="flex p-4 border-b last:border-b-0">
//                   <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
//                   <div className="ml-4">
//                     <h4 className="font-medium">{item.product?.name || 'Product name'}</h4>
//                     <p className="text-gray-600">Qty: {item.quantity}</p>
//                     <p className="font-medium">₦{(item.price * item.quantity).toFixed(2)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex justify-between font-bold">
//                 <span>Subtotal</span>
//                 <span>₦{selectedOrder.totalAmount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>₦1,500.00</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
//                 <span>Total</span>
//                 <span>₦{selectedOrder.totalAmount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
      
//       <div className="container mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* User Info */}
//           <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
//             <div className="flex items-center mb-4">
//               <img
//                 src={profilePic}
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full mr-4 object-cover border"
//               />
//               <div>
//                 <h2 className="font-semibold">{user.name}</h2>
//                 <p className="text-sm text-gray-600">{user.email}</p>
//               </div>
//             </div>

//             <div className="border-t pt-4">
//               <h3 className="font-semibold mb-2">Account Information</h3>
//               <p><strong>Name:</strong> {user.name}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Member since:</strong> {memberSince}</p>
//               {user.googleId && <p><strong>Logged in via:</strong> Google</p>}
//             </div>
//           </div>

//           {/* Order History */}
//           <div className="md:col-span-2 bg-white p-4 rounded-lg shadow" id="orders-section">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold">Order History</h2>
//               {orders.length > 0 && (
//                 <span className="text-sm text-gray-500">
//                   {orders.length} order{orders.length !== 1 ? 's' : ''}
//                 </span>
//               )}
//             </div>
            
//             {loading ? (
//               <div className="space-y-3">
//                 {[1, 2, 3].map(i => (
//                   <div key={i} className="animate-pulse flex justify-between py-3 border-b">
//                     <div className="h-4 bg-gray-200 rounded w-24"></div>
//                     <div className="h-4 bg-gray-200 rounded w-16"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : orders.length > 0 ? (
//               <div className="space-y-3">
//                 {orders
//                   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                   .map(order => {
//                     const isDelivered = order.delivered;
//                     const status = getStatusBadge(isDelivered ? 'delivered' : 'pending');
                    
//                     return (
//                       <div 
//                         key={order._id} 
//                         className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
//                         onClick={() => viewOrderDetails(order._id)}
//                       >
//                         <div className="flex justify-between">
//                           <div>
//                             <p className="font-medium">Order #{order._id.slice(-6)}</p>
//                             <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-bold">₦{order.totalAmount.toFixed(2)}</p>
//                             <span className={`text-xs px-2 py-1 rounded ${status.color}`}>
//                               {status.text}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No orders yet</p>
//                 <button
//                   onClick={() => navigate('/products')}
//                   className="mt-4 text-blue-600 hover:underline"
//                 >
//                   Start Shopping
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="mt-6 flex gap-4">
//           <a href="/wishlist" className="text-blue-600 hover:underline">My Wishlist</a>
//           <a href="/cart" className="text-blue-600 hover:underline">My Cart</a>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Profile;