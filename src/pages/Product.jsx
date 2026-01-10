import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCardGrid from "../components/ProductCards/ProductCardGrid";
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false); 

  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 500,
  });

  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const allCategories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredAndSortedProducts = products
    .filter((product) => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        default: return 0;
      }
    });

  const clearFilters = () => {
    setFilters({
      categories: [],
      minPrice: 0,
      maxPrice: 500,
    });
  };

  if (loading) return <><Navbar/> <p className="text-center font-bold text-2xl text-[#F53E32]">Loading...</p></>;

  const FilterSection = ({ isModal = false }) => (
    <div className={`${isModal ? 'p-4 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto' : 'w-64 p-4 bg-white rounded-lg shadow-md'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold">Filter By</h2>
        {isModal && (
          <button onClick={() => setShowFilters(false)} className="text-gray-500">
            ✕
          </button>
        )}
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Product Category</h3>
        <div className="space-y-2">
          {allCategories.length > 0
            ? allCategories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...filters.categories, cat]
                        : filters.categories.filter((c) => c !== cat);
                      setFilters({ ...filters, categories: updated });
                    }}
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))
            : ["Juice & Drinks", "Dairy & Milk", "Snack & Spice"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...filters.categories, cat]
                        : filters.categories.filter((c) => c !== cat);
                      setFilters({ ...filters, categories: updated });
                    }}
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
        </div>
      </div>

      
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Price Range</h3>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
            className="w-full"
          />
          <span className="text-xs">₦{filters.minPrice} – ₦{filters.maxPrice}</span>
        </div>
      </div>

      
      <button
        onClick={clearFilters}
        className="w-full bg-gray-200 text-gray-800 py-1.5 px-3 rounded text-sm hover:bg-gray-300"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <Navbar/>
    <div className="container mx-auto px-4 py-6">      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">All Products</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(true)}
            className="sm:hidden bg-gray-100 px-3 py-1.5 rounded text-sm"
          >
            Filters
          </button>
          <span className="text-sm text-gray-600">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-16 bg-black bg-opacity-40 sm:hidden">
          <div className="w-full max-w-sm">
            <FilterSection isModal={true} />
          </div>
        </div>
      )}

      <div className="hidden sm:flex gap-6">
        <aside>
          <FilterSection />
        </aside>
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCardGrid key={product._id} product={product} />
            ))}
          </div>
          {filteredAndSortedProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No products match your filters.</p>
          )}
        </main>
      </div>

      
      <div className="sm:hidden mt-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCardGrid key={product._id} product={product} />
          ))}
        </div>
        {filteredAndSortedProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found.</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Products;