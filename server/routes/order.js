import express from 'express';
import Order from '../models/order.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vaishukathir17@gmail.com', 
    pass: 'pmwvuixwihxajtfa',
  },
});

router.get('/invoice/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } 
  catch (error) {
    res.status(500).json({ message: 'Error fetching invoice', error });
  }
});

router.post('/create', async (req, res) => {
  const { user, products, totalAmount, address, phone } = req.body;
  
  try {
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      address,
      phone,
      paymentStatus: "Paid",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } 
  catch (err) {
    res.status(500).json({ message: "Order creation failed", error: err });
  }
});

router.post('/send/:orderId', async (req, res) => {
    console.log("📨 Send Invoice Route Hit", req.params.orderId);
  try {
    const order = await Order.findById(req.params.orderId).populate('user');
    console.log("🧾 Full order object:", JSON.stringify(order, null, 2));
    if (!order) return res.status(404).json({ message: "Order not found" });

    const html = `
      <h2>Thank you for your order from ShopSwift!</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
      <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      <p><strong>Shipping Address:</strong> ${order.address}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <h4>Items:</h4>
      <ul>
        ${order.products.map(p => `<li>${p.name} × ${p.quantity} - ₹${p.price}</li>`).join("")}
      </ul>
      <p>We hope you enjoy your purchase! 🎁</p>
    `;

    const mailOptions = {
      from: 'vaishukathir17@gmail.com',
      to: order.user.email,
      subject: 'Your ShopSwift Invoice',
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");

    res.status(200).json({ message: 'Invoice email sent successfully' });
  } 
  catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ message: 'Failed to send invoice email', error: err });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } 
  catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
});

export default router;
