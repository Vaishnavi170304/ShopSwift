import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import UserNavbar from "../components/UserNavbar";

function Invoice() {
  const { orderId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/orders/invoice/${orderId}`, {
          headers: { Authorization: token },
        });
        setInvoice(res.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [orderId]);

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.5,
      filename: `ShopSwift_Invoice_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };

  if (!invoice) return <div className="text-center mt-5">Loading Invoice...</div>;

  return (
    <div>
        <UserNavbar />
    
    <div className="container mt-5 mb-5 p-4 shadow border rounded" style={{ maxWidth: '800px', backgroundColor: '#fff' }}>
       
        
      <div ref={invoiceRef}>
        {/* LOGO + BRAND */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mt-2">ShopSwift 🛍</h2>
          <small className="text-muted">Customer Invoice</small>
        </div>

        {/* SHOP INFO */}
        <div className="d-flex justify-content-between mb-3">
          <div>
            <p><strong>From:</strong><br />
              ShopSwift Pvt Ltd<br />
              Coimbatore, TN - 641001<br />
              📩 vaishukathir17@gmail.com <br />
              📞 +91 98765 43210<br />
              GSTIN: 33ABCDE1234F1Z5
            </p>
          </div>
          <div>
            <p><strong>Invoice No:</strong> {invoice._id}</p>
            <p><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {invoice.paymentStatus}</p>
          </div>
        </div>

        {/* CUSTOMER INFO */}
        <div className="mb-4">
          <h5>Bill To:</h5>
          <p>{invoice.user?.name} ({invoice.user?.email})<br />
            {invoice.address} <br /> {invoice.phone}
          </p>
        </div>

        {/* PRODUCTS TABLE */}
        <table className="table table-bordered mt-4">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="d-flex justify-content-end mt-4">
          <div className="p-3 border rounded" style={{ minWidth: '250px', backgroundColor: '#f8f9fa' }}>
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <span className="fw-bold text-success">₹{invoice.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <div className="text-center mt-4">
        <button className="btn btn-outline-primary me-2" onClick={() => window.print()}>
          🖨️ Print
        </button>
        <button className="btn btn-success" onClick={handleDownloadPDF}>
          📥 Download PDF
        </button>
      </div>
    </div>
    </div>
  );
}

export default Invoice;
