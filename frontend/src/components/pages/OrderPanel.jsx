import React, { useState, useEffect } from "react";
import "../css/OrderPanel.css";

const API_BASE_URL = "http://localhost:5000/api/orders";

export default function OrderPanel({ open, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders when the panel opens
  useEffect(() => {
    if (open) {
      fetchOrders();
    }
  }, [open]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/myorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date (e.g., "22 Nov 2025")
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // --- UPDATED FUNCTION ---
  const formatItems = (items) => {
    return items
      .map((item) => `${item.productName} (x${item.quantity})`)
      .join(", ");
  };

  if (!open) return null;

  return (
    <>
      <div className="order-overlay" onMouseDown={onClose}>
        <div className="order-panel" onMouseDown={(e) => e.stopPropagation()}>
          <div className="op-header">
            <h3>My Orders</h3>
            <button onClick={onClose} className="op-close">
              &times;
            </button>
          </div>

          <div className="op-list">
            {loading ? (
              <p style={{ textAlign: "center", marginTop: "20px" }}>
                Loading...
              </p>
            ) : orders.length === 0 ? (
              <p>No past orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="op-card">
                  <div className="op-top">
                    {/* Status Badge */}
                    <span className={`op-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                    {/* Date */}
                    <span className="op-date">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="op-items">{formatItems(order.items)}</div>

                  {/* Total Amount */}
                  <div className="op-total">
                    Total Amount: <strong>₹{order.totalAmount}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}