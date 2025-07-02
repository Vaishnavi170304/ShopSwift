import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
import BuyNowModal from "../components/BuyNowModal";

export default function CategoryProducts() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const { dispatch, state } = useContext(ShopContext);
    const [showBuyNow, setShowBuyNow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleBuyNow = (product) => {
        setSelectedProduct(product);
        setSelectedQuantity(quantities[product._id]);
        setShowBuyNow(true);
    };


    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
        .then((res) => {
            const filtered = res.data.filter(
                (product) => product.category.toLowerCase() === categoryName.toLowerCase()
            );
            setProducts(filtered);
            
            const initialQuantities = {};
            filtered.forEach((product) => {
                initialQuantities[product._id] = 1;
            });
            setQuantities(initialQuantities);
        })
        .catch(() => alert("Error fetching products"));
    }, [categoryName]);

    const handleQuantityChange = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id] : Math.max(1, prev[id] + delta)
        }))
    }

    const isWishlisted = (product) =>
    state.wishlist.some((item) => item._id === product._id);

    const handleWishlist = (product) => {
        if (!isWishlisted(product)) {
            dispatch({ type: "ADD_TO_WISHLIST", payload: product });
        } 
        else {
            dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product._id });
        }
    };

    const handleAddToCart = (product, qty) => {
        dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: qty } });
    };

    return (
        <div className="container-fluid">
            <UserNavbar />
            
            <h2 className="text-center pastel-border mt-3 py-3 text-capitalize">{categoryName} 🌷🛒</h2>
            
            <div className="row w-75 mx-auto py-3">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card h-100 shadow-sm position-relative">
                            <div className="position-absolute top-0 end-0 p-2"
                            style={{ 
                                cursor: "pointer", fontSize: "1.4rem", color: isWishlisted(product) ? "red" : "gray",
                            }} onClick={() => handleWishlist(product)} >
                                {isWishlisted(product) ? <FaHeart /> : <FaRegHeart />}
                            </div>

                            <img src={`http://localhost:5000/uploads/${product.image}`} className="card-img-top" alt={product.title} />
                        
                            <div className="card-body text-center">
                                <h5>{product.title}</h5>
                                <p className="text-muted">{product.description}</p>

                                <div className="d-flex justify-content-evenly align-items-center mb-3 px-2">
                                    <p className="text-success fw-bold mb-0">₹{product.price}</p>

                                    <div className="d-flex align-items-center">
                                        <span className="me-2 fw-semibold">Qty : </span>

                                        <div className="border rounded d-flex align-items-center">
                                            <button className="btn btn-sm px-2" 
                                            onClick={() => handleQuantityChange(product._id, -1)}> - </button>
                                            <span className="px-2">{quantities[product._id]}</span>
                                            <button className="btn btn-sm px-2"
                                            onClick={() => handleQuantityChange(product._id, 1)}> + </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-evenly">
                                    <button className="btn btn-info col-sm-5" onClick={() => handleAddToCart(product, quantities[product._id])}>Add to Cart 🛒</button>
                                    <button className="btn btn-warning col-sm-5" onClick={() => handleBuyNow(product)}>Buy now ✨</button>
                                </div>
                            </div>                        
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <BuyNowModal show={showBuyNow} handleClose={() => setShowBuyNow(false)}
                product={selectedProduct} quantity={selectedQuantity}/>
            )}
        </div>
    );
}
