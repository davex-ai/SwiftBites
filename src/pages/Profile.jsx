// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { getAvatarUrl } from "../utils/avatar"; // 👈 import helper

function formatDate(dateStr) {
  if (!dateStr) return "Unknown";

  // If it's a number (timestamp), convert to Date
  if (typeof dateStr === 'number') {
    dateStr = new Date(dateStr);
  }

  // If it's already a Date object, use it
  let date = dateStr instanceof Date ? dateStr : new Date(dateStr);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleDateString();
}

function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    console.log("Full user object:", user);
  console.log("User createdAt:", user?.createdAt); // 👈 LOG IT
}, [user]);

  if (!user) return null;

  const memberSince = formatDate(user.createdAt);
  const profilePic = getAvatarUrl(user); // ✅ uses photo, google, or initials

  return (
    <>
      <Navbar/>
      
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

export default Profile;