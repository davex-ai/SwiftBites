import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronRight, FaTruck, FaShieldAlt, FaHeadset, FaLeaf } from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Mock product data
const mockProducts = [
  {
    _id: '1',
    name: 'Organic Fresh Strawberries',
    price: 4500,
    category: 'Fruits',
    rating: 4.5,
    numReviews: 128,
    stock: 45,
    images: '/placeholder-strawberry.jpg'
  },
  {
    _id: '2',
    name: 'Premium Basmati Rice 5kg',
    price: 8900,
    category: 'Grains',
    rating: 4.8,
    numReviews: 256,
    stock: 23,
    images: '/placeholder-rice.jpg'
  },
  {
    _id: '3',
    name: 'Extra Virgin Olive Oil',
    price: 6200,
    category: 'Oils',
    rating: 4.6,
    numReviews: 89,
    stock: 67,
    images: '/placeholder-oil.jpg'
  },
  {
    _id: '4',
    name: 'Fresh Dairy Milk 2L',
    price: 1800,
    category: 'Dairy',
    rating: 4.7,
    numReviews: 342,
    stock: 12,
    images: '/placeholder-milk.jpg'
  }
];

const categories = [
  { name: 'Fruits & Vegetables', icon: '🥬' },
  { name: 'Grains & Cereals', icon: '🌾' },
  { name: 'Dairy Products', icon: '🥛' },
  { name: 'Meat & Seafood', icon: '🥩' },
  { name: 'Bakery', icon: '🍞' },
  { name: 'Beverages', icon: '🥤' },
  { name: 'Snacks', icon: '🍿' },
  { name: 'Spices', icon: '🧂' }
];

const FoodEcommerceHome = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Fresh Groceries Delivered to Your Doorstep
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Shop from our wide selection of fresh produce, quality meats, and pantry essentials. Get same-day delivery on orders over ₦5,000.
              </p>
              <button className="bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors inline-flex items-center space-x-2">
                <span>Shop Now</span>
                <FaChevronRight className="text-xs" />
              </button>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">🥗</div>
                    <p className="text-xs text-gray-700 font-medium">Fresh Produce</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">🥖</div>
                    <p className="text-xs text-gray-700 font-medium">Baked Daily</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">🥩</div>
                    <p className="text-xs text-gray-700 font-medium">Premium Meats</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">🧀</div>
                    <p className="text-xs text-gray-700 font-medium">Dairy Fresh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Shop by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-orange-400 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <p className="text-xs text-gray-700 font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Featured Products</h3>
            <button className="text-sm text-orange-600 hover:text-orange-700 font-medium inline-flex items-center space-x-1">
              <span>View All</span>
              <FaChevronRight className="text-xs" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-sm p-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="w-full h-40 rounded-lg overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl">{product.category === 'Fruits' ? '🍓' : product.category === 'Grains' ? '🌾' : product.category === 'Oils' ? '🫒' : '🥛'}</span>
                </div>
                <div className="flex justify-center mb-1">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-center items-center mb-1">
                  <div className="flex text-yellow-500 text-xs">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">
                    ({product.numReviews})
                  </span>
                </div>
                <h4 className="text-center font-medium text-gray-800 text-sm line-clamp-2 mb-2">
                  {product.name}
                </h4>
                <div className="flex justify-center items-baseline gap-1 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₦{product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTruck className="text-orange-600 text-xl" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Fast Delivery</h4>
              <p className="text-xs text-gray-600">Same-day delivery available</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaLeaf className="text-orange-600 text-xl" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Fresh Quality</h4>
              <p className="text-xs text-gray-600">100% fresh guarantee</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaShieldAlt className="text-orange-600 text-xl" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Secure Payment</h4>
              <p className="text-xs text-gray-600">Safe and encrypted</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaHeadset className="text-orange-600 text-xl" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">24/7 Support</h4>
              <p className="text-xs text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default FoodEcommerceHome;