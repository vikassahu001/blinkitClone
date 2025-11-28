import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ProductCard from "./ProductCard";
import "../css/ProductDetail.css";
import { slugify } from "../../utils/urlHelper";

const ProductDetail = () => {
  const { id } = useParams(); // Get Product ID from URL
  const navigate = useNavigate();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Product Data & Suggestions
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // A. Fetch Single Product
        // Assuming your backend supports GET /api/products/:id
        const prodRes = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const prodResult = await prodRes.json();

        if (prodResult.success) {
          const currentProduct = prodResult.data; // Adjust based on your actual API response structure (might be result.product)
          setProduct(currentProduct);

          // B. Fetch Suggestions (Same Category)
          if (currentProduct.category) {
            const catId =
              typeof currentProduct.category === "object"
                ? currentProduct.category._id
                : currentProduct.category;

            const suggRes = await fetch(
              `http://localhost:5000/api/products?categoryId=${catId}`
            );
            const suggResult = await suggRes.json();

            if (suggResult.success) {
              // Filter out the current product from suggestions
              const filtered = suggResult.data.filter((p) => p._id !== id);
              setSuggestions(filtered.slice(0, 6)); // Show max 6 suggestions
            }
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0); // Scroll to top on load
      }
    };

    if (id) fetchProductData();
  }, [id]);

  if (loading) return <div className="pd-loading">Loading Details...</div>;
  if (!product) return <div className="pd-error">Product not found</div>;

  // Cart Logic for the Detail Page
  const quantity = getItemQuantity(product._id);
  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div className="pd-container">
      {/* --- Main Detail Section --- */}
      <div className="pd-main-wrapper">
        {/* Left Column: Image */}
        <div className="pd-image-section">
          <div className="pd-image-box">
            <img src={product.image} alt={product.name} />
            {discount > 0 && (
              <span className="pd-discount">{discount}% OFF</span>
            )}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="pd-info-section">
          <div className="pd-breadcrumb">
            <Link to="/">Home</Link> /{" "}
            {/* Check if category exists before linking */}
            {product.category ? (
              <Link
                to={`/cn/${slugify(product.category.name)}/cid/${
                  product.category._id
                }`}
              >
                {product.category.name}{" "}
              </Link>
            ) : (
              "Product"
            )}
            / {product.name}
          </div>

          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-time-badge">⏱ {product.time || "10 MINS"}</div>

          <div className="pd-price-block">
            <span className="pd-price">₹{product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="pd-mrp">MRP ₹{product.mrp}</span>
            )}
            <span className="pd-tax-note">(Inclusive of all taxes)</span>
          </div>

          <div className="pd-actions">
            {quantity === 0 ? (
              <button className="pd-add-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            ) : (
              <div className="pd-qty-counter">
                <button onClick={() => removeFromCart(product._id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            )}
          </div>

          {/* Product Description / Unit Details */}
          <div className="pd-meta">
            <h3>Product Details</h3>
            <div className="pd-meta-row">
              <strong>Unit:</strong> <span>{product.weight}</span>
            </div>
            {product.description && (
              <div className="pd-description">
                <strong>Description:</strong>
                <p>{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Suggestions Section --- */}
      {suggestions.length > 0 && (
        <div className="pd-suggestions">
          <h2>You Might Also Like</h2>
          <div className="products-grid">
            {suggestions.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
