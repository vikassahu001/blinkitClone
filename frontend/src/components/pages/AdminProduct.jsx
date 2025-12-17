import React, { useState, useEffect } from "react";
import {
  Upload,
  LayoutList,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Package,
  Clock,
  Scale,
  ChevronDown,
  Tag,
} from "lucide-react";
import "../css/AdminAddModal.css";
import { capitalizeWords } from "../../utils/camelCase";
import { useLocation, useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [existingCategories, setExistingCategories] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.productToEdit;
  const isEditMode = !!productToEdit;

  const initialProductState = {
    name: "",
    brand: "Grocify",
    weight: "",
    price: "",
    mrp: "",
    image: "",
    time: "10 MINS",
    category: "",
  };
  const [prodFormData, setProdFormData] = useState(initialProductState);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://blinkitclone-hjmy.onrender.com/api/category"
        );
        const data = await res.json();
        if (data.success || Array.isArray(data)) {
          setExistingCategories(data.categories || data);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();

    if (isEditMode && productToEdit) {
      setProdFormData({
        name: productToEdit.name || "",
        brand: productToEdit.brand || "Grocify",
        weight: productToEdit.weight || "",
        price: productToEdit.price || "",
        mrp: productToEdit.mrp || "",
        image: productToEdit.image || "",
        time: productToEdit.time || "10 MINS",
        // Handle case where category might be an object or an ID string
        category:
          typeof productToEdit.category === "object"
            ? productToEdit.category._id
            : productToEdit.category || "",
      });
    } else {
      setProdFormData(initialProductState);
    }
  }, [location,isEditMode,productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const url = isEditMode
        ? `https://blinkitclone-hjmy.onrender.com/api/products/${productToEdit._id}` // Update URL
        : "https://blinkitclone-hjmy.onrender.com/api/products"; // Create URL

      const method = isEditMode ? "PUT" : "POST"; // Update Method


      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prodFormData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: isEditMode
            ? "Product updated successfully!"
            : "Product added successfully!",
        });
        
        // If adding new, reset form. If editing, maybe redirect back?
        if (!isEditMode) {
          setProdFormData(initialProductState);
        } else {
          // Optional: Redirect back to All Products after successful edit
          setTimeout(() => {
            navigate("/dashboard/all-products");
          }, 1500);
        }
      } else {
        throw new Error(data.message || "Operation failed");
      }    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container admin-form-container">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h2>

      {status.message && (
        <div
          className={`status-message ${
            status.type === "success" ? "status-success" : "status-error"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label className="form-label">
            Product Name <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Package size={18} className="input-icon" />
            <input
              type="text"
              name="name"
              autoComplete="off"
              required
              value={prodFormData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Amul Gold Milk"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="form-group">
          <label className="form-label">
            Category <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <LayoutList size={18} className="input-icon" />
            <select
              name="category"
              required
              autoComplete="off"
              value={prodFormData.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select a Category</option>
              {existingCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {capitalizeWords(cat.name)}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="select-arrow" />
          </div>
        </div>

        {/* Row: Brand & Weight */}
        <div className="form-row">
          <div className="form-col form-group">
            <label className="form-label">Brand</label>
            <div className="input-wrapper">
              <Tag size={18} className="input-icon" />
              <input
                type="text"
                name="brand"
                autoComplete="off"
                value={prodFormData.brand}
                onChange={handleChange}
                className="form-input"
                placeholder="Grocify"
              />
            </div>
          </div>
          <div className="form-col form-group">
            <label className="form-label">
              Weight <span className="required-star">*</span>
            </label>
            <div className="input-wrapper">
              <Scale size={18} className="input-icon" />
              <input
                type="text"
                name="weight"
                autoComplete="off"
                required
                value={prodFormData.weight}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 500g"
              />
            </div>
          </div>
        </div>

        {/* Row: Price & MRP */}
        <div className="form-row">
          <div className="form-col form-group">
            <label className="form-label">
              Price (₹) <span className="required-star">*</span>
            </label>
            <div className="input-wrapper">
              <IndianRupee size={18} className="input-icon" />
              <input
                type="number"
                name="price"
                autoComplete="off"
                required
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                }}
                value={prodFormData.price}
                onChange={handleChange}
                className="form-input"
                placeholder="Sale Price"
              />
            </div>
          </div>
          <div className="form-col form-group">
            <label className="form-label">
              MRP (₹) <span className="required-star">*</span>
            </label>
            <div className="input-wrapper">
              <IndianRupee size={18} className="input-icon" />
              <input
                type="number"
                name="mrp"
                autoComplete="off"
                required
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                }}
                value={prodFormData.mrp}
                onChange={handleChange}
                className="form-input"
                placeholder="Max Price"
              />
            </div>
          </div>
        </div>

        {/* Row: Image & Time */}
        <div className="form-group">
          <label className="form-label">
            Image URL <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Upload size={18} className="input-icon" />
            <input
              type="url"
              name="image"
              required
              autoComplete="off"
              value={prodFormData.image}
              onChange={handleChange}
              className="form-input"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Delivery Time</label>
          <div className="input-wrapper">
            <Clock size={18} className="input-icon" />
            <input
              type="text"
              name="time"
              autoComplete="off"
              value={prodFormData.time}
              onChange={handleChange}
              className="form-input"
              placeholder="10 MINS"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading
            ? "Processing..."
            : isEditMode
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminProduct;