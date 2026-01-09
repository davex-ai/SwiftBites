import React, { useState, useEffect } from 'react';
import { FaUsers, FaShoppingBag, FaBox, FaTruck, FaHeadset, FaShieldAlt, FaStar, FaLeaf, FaHeart, FaRocket } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ visitors: 0, customers: 0, products: 0 });
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true);
    
    // Animated counters
    const animateCount = (key, target, duration) => {
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    animateCount('visitors', 10000, 2000);
    animateCount('customers', 23000, 2500);
    animateCount('products', 2000, 1800);
  }, []);

  const features = [
    {
      icon: <FaTruck className="text-4xl" />,
      title: "Delivery in 5 Days",
      description: "Lightning-fast delivery straight to your doorstep with real-time tracking"
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service ready to help with any questions"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Payment Secure",
      description: "Bank-level encryption ensures your transactions are always protected"
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "Eco-Friendly",
      description: "Sustainable packaging and carbon-neutral delivery options available"
    }
  ];

  const values = [
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Customer First",
      description: "Your satisfaction drives everything we do at SwiftBites"
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Quality Assured",
      description: "Only the finest products make it to our curated selection"
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Innovation",
      description: "Constantly evolving to bring you the best shopping experience"
    }
  ];

  return (
    <>
        <Navbar/>
    
       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            About SwiftBites
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            SwiftBites is revolutionizing the way you shop for food and groceries. Founded in 2020, 
            we've grown from a small startup to a trusted platform serving thousands of customers daily.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className={`transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              What started as a simple idea to make grocery shopping more convenient has evolved into 
              a comprehensive platform that connects you with the best local and international products. 
              We believe that everyone deserves access to quality food without the hassle of crowded stores 
              and long checkout lines.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of passionate food enthusiasts works tirelessly to curate the finest selection, 
              negotiate the best prices, and ensure every order arrives fresh and on time. We're not just 
              a delivery service – we're your partner in creating memorable meals and moments.
            </p>
          </div>
          
          <div className={`transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              To make quality food accessible to everyone, everywhere, while supporting local businesses 
              and promoting sustainable practices. We envision a world where shopping for groceries is 
              effortless, enjoyable, and environmentally responsible.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every day, we strive to exceed expectations by offering unparalleled service, maintaining 
              the highest quality standards, and building lasting relationships with our customers and partners.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl shadow-2xl p-12 mb-20 transform hover:scale-105 transition-transform duration-500">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <FaUsers />, value: counts.visitors, suffix: 'k', label: 'Visitors', color: 'from-yellow-200 to-yellow-400' },
              { icon: <FaShoppingBag />, value: counts.customers, suffix: 'k', label: 'Customers', color: 'from-pink-200 to-pink-400' },
              { icon: <FaBox />, value: counts.products, suffix: 'k', label: 'Products', color: 'from-blue-200 to-blue-400' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`transform hover:scale-110 transition-all duration-500 delay-${index * 100}`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full mb-4 text-gray-800 animate-bounce`}>
                  {React.cloneElement(stat.icon, { className: 'text-2xl' })}
                </div>
                <div className="text-white">
                  <div className="text-5xl font-bold mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-xl font-semibold opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose SwiftBites?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-t-4 border-red-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-red-500 mb-4 transform hover:rotate-12 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-red-500 mb-4 shadow-md transform hover:rotate-360 transition-transform duration-700">
                  {value.icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12 shadow-xl">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-6">Meet Our Team</h3>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            Behind SwiftBites is a dedicated team of food lovers, tech innovators, and customer service 
            champions working together to bring you the best shopping experience.
          </p>
          <div className="text-center">
            <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
              Join Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-4xl font-bold mb-4">Ready to Experience SwiftBites?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers and start your journey today!</p>
           <button className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300" onClick={() => navigate("/login")}>
            Get Started Now
          </button>
        </div>
      </div>
    </div>
    </>
  );
}