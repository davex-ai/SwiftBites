

import React, { useState } from 'react';
import { BASE_IMAGE_URL } from '../../api/axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // npm install react-icons

const ProductCardGrid = ({ product }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => setIsLoading(false);

    const handleAddToCart = () => {
        // HELP Dispatch to Redux or context
        alert(`Added ${product.name} to cart!`);
    };

    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
        //HELP Sync with backend
    };


    return (
        <div className="bg-white rounded-xl shadow-sm p-3 mb-4 hover:shadow-lg transition-shadow duration-300">
            {/* Image Container */}
            <div className="w-full h-40  rounded-lg overflow-hidden mb-3 relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg" />
                    </div>
                )}
                <img
                    src={`${BASE_IMAGE_URL}${product.images}`}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    onLoad={handleImageLoad}
                    onError={() => setIsLoading(false)}
                />
                {/* Wishlist Heart */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {isInWishlist ? (
                        <FaHeart className="text-red-500" />
                    ) : (
                        <FaRegHeart className="text-gray-600" />
                    )}
                </button>
            </div>

            {/* Category */}
            <div className="flex justify-center mb-1">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.category}
                </span>
            </div>

            {/* Rating */}
            <div className="flex justify-center items-center mb-1">
                <div className="flex text-yellow-500">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="ml-1 text-xs text-gray-500">
                    ({product.numReviews} reviews)
                </span>
            </div>

            {/* Name */}
            <h3 className="text-center font-medium text-gray-800 text-sm line-clamp-2 mb-2">
                {product.name}
            </h3>

            {/* Price */}
            <div className="flex justify-center items-baseline gap-1 mb-2">
                <span className="text-lg font-bold text-gray-900">
                    ₦{typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                </span>
            </div>

            {/* Stock Status */}
            <div className="flex justify-center mb-3">
                <span
                    className={`text-xs px-2 py-1 rounded-full ${product.stock > 0
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                >
                    {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
                </span>
            </div>

         
        </div>
    );

};

export default ProductCardGrid;