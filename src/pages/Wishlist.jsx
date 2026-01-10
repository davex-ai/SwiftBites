
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProductCardGrid from "../components/ProductCards/ProductCardGrid";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await api.get("/wishlist");
        setWishlistProducts(data.products || []);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Please log in to view wishlist");
          navigate("/login");
        } else {
          toast.error("Failed to load wishlist");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete("/wishlist", { data: { productId } });
      setWishlistProducts(prev => prev.filter(p => p._id !== productId));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-center text-xl">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6 h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          {wishlistProducts.length > 0 && (
            <Link 
              to="/products" 
              className="text-blue-600 hover:underline text-sm"
            >
              Continue Shopping →
            </Link>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Your wishlist is empty</p>
            <Link 
              to="/products" 
              className="mt-4 inline-block bg-[#F53E32] text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlistProducts.map((product) => (
              <div key={product._id} className="relative group">
                <ProductCardGrid product={product} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(product._id);
                  }}
                  className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md 
                             opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Wishlist;