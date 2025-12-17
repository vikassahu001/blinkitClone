import React, { useEffect, useState } from "react";
import { Trash2, Edit, PackageOpen } from "lucide-react"; // Added Icons
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://blinkitclone-hjmy.onrender.com/api/products"
        );
        const result = await response.json();
        if (result.success && result.data) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(
          `https://blinkitclone-hjmy.onrender.com/api/products/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (data.success) {
          setProducts(products.filter((product) => product._id !== id));
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleEdit = (product) => {
    navigate("/dashboard/add-products", { state: { productToEdit: product } });
  };

  if (loading) return <div className="p-5">Loading products...</div>;

  return (
    <div className="admin-page-container">
      <div className="flex justify-between items-center mb-6 sticky-sub-header">
        <h2 className="text-xl font-bold text-gray-800">
          All Products ({products.length})
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <PackageOpen size={48} className="mx-auto mb-2 opacity-50" />
          <p>No products found.</p>
        </div>
      ) : (
        // --- THE NEW GRID LAYOUT ---
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="admin-product-card">
              {/* Image Section */}
              <div className="admin-card-img-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="admin-card-img"
                  loading="lazy"
                />
              </div>

              {/* Content Section */}
              <div className="admin-card-content">
                <h3 className="admin-card-title" title={product.name}>
                  {product.name}
                </h3>
                <p className="admin-card-weight">
                  {product.weight} • {product.brand}
                </p>

                <div className="mt-2">
                  <span className="admin-card-price">₹{product.price}</span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="admin-card-mrp">₹{product.mrp}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="admin-card-actions">
                <button
                  onClick={() => handleEdit(product)}
                  className="admin-btn btn-edit"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="admin-btn btn-delete"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
