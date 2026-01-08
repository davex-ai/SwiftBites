// src/context/CartWishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartWishlistContext = createContext();

export const CartWishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [wishlistProductIds, setWishlistProductIds] = useState(new Set());

  const fetchCounts = async () => {
    if (!user) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    setLoading(true);
    try {
      // Fetch cart
      const cartRes = await api.get("/my-cart");
      setCartCount(cartRes.data?.length || 0);

      // Fetch wishlist
      const wishlistRes = await api.get("/wishlist");
      setWishlistCount(wishlistRes.data?.products?.length || 0);
      const wishlistProducts = wishlistRes.data.products
      const wishlistIds = new Set(wishlistProducts.map(p => p._id));
      setWishlistCount(wishlistProducts.length);
      setWishlistProductIds(wishlistIds); 
    } catch (err) {
      console.error("Failed to fetch cart/wishlist counts:", err);
      setCartCount(0);
      setWishlistCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [user]);

  return (
    <CartWishlistContext.Provider
      value={{
        cartCount,
        wishlistCount,
        refetch: fetchCounts,
        wishlistProductIds, 
        loading,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => useContext(CartWishlistContext);