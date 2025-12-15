import React from 'react';
import { BASE_IMAGE_URL } from '../../api/axios'

function ProductCardGrid({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Image */}
      <img
        src={`${BASE_IMAGE_URL}${product.images}`} // ✅ Now points to backend server
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      {/* Name */}
      <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h3>

      {/* Price */}
      <p className="text-xl font-bold text-green-600 mb-2">₦{product.price}</p>

      {/* Category */}
      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
        {product.category}
      </span>

      {/* Stock Status */}
      {product.stock > 0 ? (
        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          In stock ({product.stock})
        </span>
      ) : (
        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
          Out of stock
        </span>
      )}

      {/* Rating */}
      {product.rating && (
        <div className="mt-2 text-yellow-500">
          {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
          <span className="ml-1 text-gray-600 text-xs">({product.numReviews} reviews)</span>
        </div>
      )}
    </div>
  );
}

export default ProductCardGrid;