import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaTruck, FaShieldAlt, FaHeadset, FaLeaf, FaPercent, FaClock, FaStar } from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProductCardGrid from '../components/ProductCards/ProductCardGrid';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const FoodEcommerceHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.slice(0, 8)); // Get first 8 products for featured section
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deals = [
    {
      title: 'Fresh Produce',
      discount: 'Up to 30% Off',
      description: 'Farm-fresh fruits and vegetables',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Dairy Essentials',
      discount: 'Save 25%',
      description: 'Premium milk, cheese & yogurt',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Bakery Items',
      discount: 'Buy 2 Get 1',
      description: 'Freshly baked daily',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'Pantry Staples',
      discount: '20% Off',
      description: 'Rice, grains & cooking oils',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Fresh Groceries Delivered to Your Doorstep
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Shop from our wide selection of fresh produce, quality meats, and pantry essentials. Get same-day delivery on orders over ₦5,000. Experience the convenience of online grocery shopping with guaranteed freshness and competitive prices.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors inline-flex items-center space-x-2">
                <Link to="/products"> <span>Shop Now</span></Link>
                <FaChevronRight className="text-xs" />
              </button>
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-orange-600">
                <Link to="/products">Browse Categories</Link>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <FaClock className="text-orange-600 text-xl" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Delivery Time</p>
                <p className="text-sm font-bold text-gray-900">30-60 mins</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <FaPercent className="text-orange-600 text-xl" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Save Up To</p>
                <p className="text-sm font-bold text-gray-900">30% Off</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <FaStar className="text-orange-600 text-xl" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Rated</p>
                <p className="text-sm font-bold text-gray-900">4.8/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Special Deals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deals.map((deal, index) => (
              <div
                key={index}
                className={`${deal.bgColor} rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className={`text-sm font-bold ${deal.textColor}`}>{deal.title}</h4>
                  <FaPercent className={`${deal.textColor} text-lg group-hover:scale-110 transition-transform`} />
                </div>
                <p className={`text-lg font-bold ${deal.textColor} mb-2`}>{deal.discount}</p>
                <p className="text-xs text-gray-600">{deal.description}</p>
                <button className={`mt-4 text-xs ${deal.textColor} font-medium inline-flex items-center space-x-1 hover:underline`}>
                  <Link to="/products"><span>Shop Now</span></Link>
                  <FaChevronRight className="text-xs" />
                </button>
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
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCardGrid key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Why Choose FreshMart</h3>
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

      <Footer/>
    </div>
  );
};

export default FoodEcommerceHome;