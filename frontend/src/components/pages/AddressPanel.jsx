import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "../css/AddressPanel.css";

const API_BASE_URL = "https://blinkitclone-hjmy.onrender.com/api/user";

export default function AddressPanel({ open, onClose }) {
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 1. New State for tracking errors
  const [errors, setErrors] = useState({});

  const [newAddress, setNewAddress] = useState({
    label: "Home",
    addressLine: "",
    city: "",
    pincode: "",
  });
  const [view, setView] = useState("LIST");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) fetchAddresses();
  }, [open]);

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setAddresses(data.user.savedAddresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (addr) => {
    setNewAddress({
      label: addr.label,
      addressLine: addr.addressLine,
      city: addr.city,
      pincode: addr.pincode,
    });
    setEditingId(addr._id);
    setErrors({}); // Clear errors when opening edit
    setView("FORM");
  };

  // 2. Validation Logic
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!newAddress.addressLine.trim()) {
      tempErrors.addressLine = "Address line is required";
      isValid = false;
    }

    if (!newAddress.city.trim()) {
      tempErrors.city = "City is required";
      isValid = false;
    }

    if (newAddress.pincode.length !== 6) {
      tempErrors.pincode = "Pincode must be exactly 6 digits";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

 
  const handleSave = async () => {
    // 3. Replace alert with validateForm check
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_BASE_URL}/address/${editingId}`
      : `${API_BASE_URL}/address`;

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: {
            ...newAddress,
            location: { type: "Point", coordinates: [0, 0] },
          },
        }),
      });
      const data = await res.json();

      if (data.success) {
        setAddresses(data.addresses);
        resetForm();
      } else {
        alert(data.message || "Failed to save");
      }
    } catch (err) {
      alert("Error saving address");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    const token = localStorage.getItem("token");
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/address/${addressId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setAddresses(data.addresses);
      else alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setView("LIST");
    setEditingId(null);
    setErrors({}); // Clear errors
    setNewAddress({
      label: "Home",
      addressLine: "",
      city: "",
      pincode: "",
    });
  };

   const handleKeyDown = (e) => {
     if (e.key === "Enter") {
       handleSave();
     }
  };
  
  if (!open) return null;

  return (
    <>
      <div className="address-overlay" onClick={onClose}>
        <div className="address-panel" onClick={(e) => e.stopPropagation()}>
          <div className="ap-header">
            <h3>
              {view === "LIST"
                ? "Saved Addresses"
                : editingId
                ? "Edit Address"
                : "Add Address"}
            </h3>
            <button onClick={onClose} className="ap-close">
              &times;
            </button>
          </div>

          <div className="ap-body">
            {view === "LIST" ? (
              <>
                <button
                  className="ap-add-btn"
                  onClick={() => {
                    resetForm();
                    setView("FORM");
                  }}
                >
                  + Add New Address
                </button>

                <div className="ap-list">
                  {addresses.length === 0 ? (
                    <p className="ap-empty-msg">No addresses saved yet.</p>
                  ) : (
                    addresses.map((addr, i) => (
                      <div key={addr._id || i} className="ap-card">
                        <div className="ap-card-header">
                          <strong className="ap-tag">{addr.label}</strong>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              className="ap-icon-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(addr);
                              }}
                              title="Edit Address"
                              style={{ color: "#333" }}
                            >
                              <MdEdit size={18} />
                            </button>
                            <button
                              className="ap-icon-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(addr._id);
                              }}
                              title="Delete Address"
                              style={{ color: "#ff4444" }}
                            >
                              <MdDelete size={18} />
                            </button>
                          </div>
                        </div>
                        <p>
                          {addr.addressLine}, {addr.city} - {addr.pincode}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="ap-form" onKeyDown={handleKeyDown}>
                <div className="ap-type-selector">
                  {["Home", "Work", "Other"].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setNewAddress({ ...newAddress, label: type })
                      }
                      className={`ap-type-btn ${
                        newAddress.label === type ? "active" : ""
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Address Line Input */}
                <input
                  className={`ap-input ${
                    errors.addressLine ? "input-error" : ""
                  }`}
                  placeholder="Address Line"
                  value={newAddress.addressLine}
                  onChange={(e) => {
                    setNewAddress({
                      ...newAddress,
                      addressLine: e.target.value,
                    });
                    if (errors.addressLine)
                      setErrors({ ...errors, addressLine: null });
                  }}
                />
                {errors.addressLine && (
                  <span className="error-msg">{errors.addressLine}</span>
                )}

                {/* City Input */}
                <input
                  className={`ap-input ${errors.city ? "input-error" : ""}`}
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => {
                    setNewAddress({ ...newAddress, city: e.target.value });
                    if (errors.city) setErrors({ ...errors, city: null });
                  }}
                />
                {errors.city && (
                  <span className="error-msg">{errors.city}</span>
                )}

                {/* Pincode Input */}
                <input
                  className={`ap-input ${errors.pincode ? "input-error" : ""}`}
                  placeholder="Pincode"
                  maxLength={6}
                  value={newAddress.pincode}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setNewAddress({ ...newAddress, pincode: val });
                      // Clear error if valid
                      if (errors.pincode)
                        setErrors({ ...errors, pincode: null });
                    }
                  }}
                />
                {errors.pincode && (
                  <span className="error-msg">{errors.pincode}</span>
                )}

                <div className="ap-actions">
                  <button
                    className="ap-save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : editingId
                      ? "Update Address"
                      : "Save Address"}
                  </button>
                  <button className="ap-cancel-btn" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
