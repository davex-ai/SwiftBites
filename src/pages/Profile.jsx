// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user orders (if you have this API)
    const fetchOrders = async () => {
      try {
        const res = await api.get('/my-orders');
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  if (!user) return null;

  return (
    <>
    <Navbar/>
    
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Account Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Order History */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Recent Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-2">
              {orders.map(order => (
                <li key={order._id} className="border-b pb-2">
                  <div>Order #{order._id.slice(-6)}</div>
                  <div>₦{order.total.toFixed(2)} • {new Date(order.createdAt).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet</p>
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