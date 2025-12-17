import React, { useState } from "react";
import {
  Upload,
  Type,
  LayoutList,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "../css/AdminAddModal.css"; // We reuse the CSS for form styling

const AdminCategory = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const initialCategoryState = {
    name: "",
    image: "",
    alt: "",
    priority: 0,
    isActive: true,
  };
  const [catFormData, setCatFormData] = useState(initialCategoryState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    if (name === "priority") {
      if (val === "") {
        // keep empty
      } else {
        const numVal = parseInt(val, 10);
        if (numVal < 0) val = 0;
        if (numVal > 5) val = 5;
      }
    }
    setCatFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        "https://blinkitclone-hjmy.onrender.com/api/category",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(catFormData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Category added successfully!",
        });
        setCatFormData(initialCategoryState); // Reset form
      } else {
        throw new Error(data.message || "Operation failed");
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-page-container admin-form-container">
      <h2 className="text-xl font-bold mb-4">Add New Category</h2>

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
        <div className="form-group">
          <label className="form-label">
            Category Name <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Type size={18} className="input-icon" />
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              value={catFormData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Dairy & Bread"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Image URL <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Upload size={18} className="input-icon" />
            <input
              type="url"
              name="image"
              autoComplete="off"
              required
              value={catFormData.image}
              onChange={handleChange}
              className="form-input"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col form-group">
            <label className="form-label">Priority</label>
            <div className="input-wrapper">
              <LayoutList size={18} className="input-icon" />
              <input
                type="number"
                name="priority"
                min="0"
                max="5"
                autoComplete="off"
                value={catFormData.priority}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-col toggle-wrapper">
            <label className="toggle-label">
              <input
                type="checkbox"
                name="isActive"
                checked={catFormData.isActive}
                onChange={handleChange}
                className="toggle-checkbox"
              />
              <div className="toggle-track">
                <div className="toggle-thumb"></div>
              </div>
              <span className="toggle-text">Active</span>
            </label>
          </div>
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Processing..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AdminCategory;