
import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCardGrid from "../components/ProductCards/ProductCardGrid";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center font-bold text-2xl text-[#F53E32]">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
  <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {products.map((product) => (
      <ProductCardGrid key={product._id} product={product} />
    ))}
  </div>
</div>
  );
}

export default ProductsPage;
