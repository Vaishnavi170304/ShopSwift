import { useState } from "react";
import axios from "axios";

export default function AddProduct({ onProductAdded }) {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({ ...product, [name]: name === "image" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("category", product.category);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try { 
      const token = localStorage.getItem("token");
      
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { Authorization: `Bearer ${token}`, },
      });

      if (res.status === 201) {
        alert("Product added!");

        // Change to view product tab
        if (typeof onProductAdded === "function") {
          onProductAdded();
        }
      } 
      else {
        alert("Something went wrong, try again.");
      }
    } 
    catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container mt-4 text-center rounded shadow p-5 auth-bg w-75">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" className="form-control my-2" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="form-control my-2" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" className="form-control my-2" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" className="form-control my-2" onChange={handleChange} />
        <select name="category" className="form-control my-2" onChange={handleChange} value={product.category} required>
          <option value="">Select a category</option>
          <option value="Hamper">Hamper</option>
          <option value="Bows">Bows</option>
          <option value="Scrunchies">Scrunchies</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Earring">Earring</option>
          <option value="Neckchains">Neckchains</option>
        </select>
        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}
