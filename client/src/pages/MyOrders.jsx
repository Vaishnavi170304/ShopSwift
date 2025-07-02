import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/user/${userId}`, {
        headers: { Authorization: token },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders", err));
  }, [userId, token]);

  return (
    <div className="container mt-4">
      <UserNavbar />
      <h3 className="text-center mb-4">📦 My Orders</h3>

      {orders.length === 0 ? (
        <p className="text-center">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">🧾 Order ID: {order._id}</h5>
                <p className="mb-1"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="mb-1"><strong>Address:</strong> {order.address}</p>
                <p className="mb-1"><strong>Phone:</strong> {order.phone}</p>
              </div>
              <h5 className="text-success mb-0">₹{order.totalAmount}</h5>
            </div>

            <hr />

            {order.products.map((product, index) => (
              <div key={index} className="d-flex mb-3 align-items-center">
                {product.image && (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      marginRight: "15px",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <div>
                  <h6 className="mb-1">{product.name}</h6>
                  <p className="mb-1">Quantity: <strong>{product.quantity}</strong></p>
                  <p className="mb-1">Price: ₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
