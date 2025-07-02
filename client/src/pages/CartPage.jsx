import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function CartPage() {
  const { state, dispatch } = useContext(ShopContext);
  const cart = state.cart;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // useMemo - calculate prices only when cart changes
  const { totalPrice, totalDiscount, orderTotal } = useMemo(() => {
    const price = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const discount = Math.round(price * 0.01); // 1% discount
    return {
      totalPrice: price,
      totalDiscount: discount,
      orderTotal: price - discount,
    };
  }, [state.cart]);

  const handleRemove = async (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); 

    const products = cart.map(item => ({
      name: item.title,
      quantity: item.quantity,
      price: item.price
    }));

    const totalAmount = orderTotal;

    try {
      const res = await axios.post("http://localhost:5000/api/orders/create", {
        user: userId,
        products,
        totalAmount,
        address,
        phone,
      }, 
      {
        headers: { Authorization: token }
      });

      const orderId = res.data._id; 

      await axios.post(`http://localhost:5000/api/orders/send/${orderId}`, {}, {
      headers: { Authorization: token }
    });

    alert("✅ Order placed and invoice sent to your email!");
    setShowModal(false);
    navigate(`/invoice/${orderId}`); // Navigate to invoice page
    } 
    catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to place order.");
    }
  };


  return (
    <div className="container-fluid">
      <UserNavbar />
      <h3 className="text-center mb-4">🛒 Your Shopping Cart</h3>

      {state.cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          <div className="row">
            {cart.map((item) => (
              <div className="col-md-12 mb-3" key={item._id}>
                <div className="card shadow-sm p-3 d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title}
                    className="me-3" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                    
                    <div>
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="text-muted mb-1">{item.description}</p>
                      <p className="mb-1 fw-bold">₹{item.price}</p>
                      <p className="mb-1">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <div>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemove(item._id)}>
                      <FaTimes /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="card p-3 mt-4">
            <h5>Price Details ({state.cart.length} {state.cart.length === 1 ? "Item" : "Items"})</h5>
            <hr />

            <div className="d-flex justify-content-between">
              <span>Total Product Price</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="d-flex justify-content-between text-success">
              <span>Total Discounts</span>
              <span>- ₹{totalDiscount}</span>
            </div>
            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Order Total</span>
              <span>₹{orderTotal}</span>
            </div>

            {totalDiscount > 0 && (
              <div className="alert alert-success mt-3 p-2 text-center">
                🎉 Yay! Your total discount is ₹{totalDiscount}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <h5 className="mb-0">₹{orderTotal}</h5>
              <button className="btn btn-primary px-4" onClick={() => setShowModal(true)}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Delivery Address</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your full delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}> Cancel </Button>
          <Button variant="success" onClick={handlePlaceOrder}> Place Order </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
