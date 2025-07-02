import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
    const { id } = useParams(); // get product ID from URL
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products`)
        .then((res) => {
            const item = res.data.find(p => p._id === id);
            if (item) {
                setProduct({
                    title : item.title,
                    description : item.description,
                    price : item.price,
                    image: item.image,
                });
            }
            else {
                alert("Product not found");
            }
        })
        .catch(() => alert("Error fetching product data"));
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        
        if (image) formData.append("image", image);

        const token = localStorage.getItem("token");
        
        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
            },});
            
            alert("Product updated!");
            navigate("/admin");
        } 
        catch (err) {
            console.error("Update failed:", err);
            alert("Update failed");
        }
    };
    
    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-center">Edit Product 🖊</h3>
            
            <form className="w-50 mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title"
                    value={product.title} onChange={handleChange} required/>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" rows="3"
                    value={product.description} onChange={handleChange} required></textarea>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" name="price"
                    value={product.price} onChange={handleChange} required />
                </div>
                
                {/* Show existing image if available */}
                {product.image && (
                    <div className="mb-3 text-center">
                        <img src={`http://localhost:5000/uploads/${product.image}`} alt="current"
                        className="img-thumbnail" style={{ maxHeight: "150px" }} />
                    </div>
                )}
                
                <div className="mb-3">
                    <label className="form-label">Update Image (optional)</label>
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>
                
                {/* Submit button */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </div>
            </form>
        </div>
    );
}
