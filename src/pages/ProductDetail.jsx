// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProductCardGrid from "../components/ProductCards/ProductCardGrid";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar'
import { getImageUrl } from "../utils/image";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
 
        // Fetch related products by category
        if (data.category) {
          const related = await api.get(`/products/category/${data.category}`);
          setRelatedProducts(related.data.filter(p => p._id !== id).slice(0, 4)); // Show 4 related
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        toast.error("Product not found");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) return <div className="text-center py-10">Loading product...</div>;

  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      toast.error("Out of stock!");
      return;
    }

    try {
      const response = await api.post("/cart", {
        productId: product._id,
        quantity: parseInt(quantity)
      });

      toast.success(`Added ${product.name} to cart!`);
      // Optional: Update cart count in navbar or redirect to cart
    } catch (err) {
      toast.error("Failed to add to cart. Please try again.");
      console.error(err);
    }
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
    // Later: connect to backend wishlist API
  };

  return (
    <>
     <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <a href="/products" className="text-blue-600 hover:underline">All Products</a> &gt; {product.name}
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 👈 IMAGE GALLERY */}
          {/* 👈 IMAGE GALLERY */}
<div className="lg:w-1/2">
  <div className="relative mb-4 rounded-xl overflow-hidden shadow-lg bg-gray-50">
    {/* Loading Skeleton */}
    {!product.images && (
      <div className="w-full h-80 bg-gray-200 animate-pulse rounded-xl"></div>
    )}

    {/* Main Image */}
      {product.images ? (
        <img
          src={getImageUrl(product.images)}
          alt={product.name}
          className="w-full h-auto object-contain p-4  transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = '/placeholder.png'; // fallback if broken
            e.target.classList.remove('hover:scale-105');
          }}
        />
      ) : (
        <img
          src="/placeholder.png"
          alt="Placeholder"
          className="w-full h-80 object-contain p-4 bg-white"
        />
      )}
    </div>

    {/* Optional: Add "Image not available" text if needed */}
    {!product.images && (
      <p className="text-center text-sm text-gray-500 mt-2">No image available</p>
    )}
  </div>

        {/* 👉 PRODUCT INFO */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ₦{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg line-through text-gray-500">
                ₦{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs ${
                product.stock > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <label className="mr-2">Qty:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-16"
            />
          </div>

          {/* Add to Cart & Wishlist Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`px-6 py-2 rounded font-medium ${
                product.stock > 0
                  ? "bg-[#F53E32] text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={toggleWishlist}
              className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isInWishlist ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description || "No description available."}</p>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Price:</strong> ₦{product.price || "N/A"}</li>
              <li><strong>Stock:</strong> {product.stock || "N/A"}</li>
              <li><strong>Rating:</strong> {product.rating || "N/A"}</li>
              <li><strong>Speciality:</strong> {product.speciality || "N/A"}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCardGrid key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* REVIEWS SECTION */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Customer Reviews ({product.numReviews})</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center mb-1">
                  <div className="flex text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
    </>
  );
}

export default ProductDetail;