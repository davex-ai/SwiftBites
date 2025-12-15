function ProductCardGrid({ product }) {
  return (
    <div className="product-card">
      <img src={product.images} alt={product.name} />

      <h3>{product.name}</h3>
      <p className="price">₦{product.price}</p>

      <span className="category">{product.category}</span>

      {product.stock > 0 ? (
        <span className="in-stock">In stock</span>
      ) : (
        <span className="out-stock">Out of stock</span>
      )}
    </div>
  );
}

export default ProductCardGrid;
