import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const BuyNowModal = ({ show, handleClose, product, quantity }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:5000/api/orders/create", {
        user: userId,
        products: [
          {
            name: product.title,
            quantity: quantity,
            price: product.price,
            image: product.image, 
          },
        ],
        totalAmount: product.price * quantity,
        address,
        phone,
      }, {
        headers: { Authorization: token }
      });

      const orderId = res.data._id;

      await axios.post(`http://localhost:5000/api/orders/send/${orderId}`, {}, {
        headers: { Authorization: token }
      });

      alert("✅ Order placed and invoice sent!");
      handleClose();
      window.location.href = `/invoice/${orderId}`;
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Buy Now</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>{product.title}</h5>
        <p>
          Price: ₹{product.price} × {quantity} ={" "}
          <strong className="text-success">₹{product.price * quantity}</strong>
        </p>

        <Form.Group className="mb-3">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Form.Label className="mt-2">Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="success" onClick={handlePlaceOrder}>Place Order</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyNowModal;
