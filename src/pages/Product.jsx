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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCardGrid key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;
