import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Error fetching products"));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // handle delete product
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      alert("Product deleted successfully");
      fetchProducts(); // Refresh list
    } 
    catch (err) {
      alert("Error deleting product");
    }
  };

  // nav to update form 
  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Products</h2>

      <div className="row mt-4">
        {products.map((product, i) => (
          <div key={i} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">

              {product.image && (
                <img src={`http://localhost:5000/uploads/${product.image}`} className="img-fluid mb-3 rounded" alt={product.title} />
              )}

              <h5 className="fw-bold">{product.title}</h5>
              <p className="text-muted">{product.description}</p>
              <p className="text-success fw-semibold"><strong>₹{product.price}</strong></p>

              <div className="d-flex justify-content-end gap-3 mt-2">
                <i className="fa fa-pencil text-info"
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                title="Edit" onClick={() => handleEdit(product._id)}></i>
                <i className="fa fa-trash text-danger"
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                title="Delete" onClick={() => handleDelete(product._id)}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
