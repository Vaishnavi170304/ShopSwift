import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaHeart } from "react-icons/fa";
import UserNavbar from "../components/UserNavbar";
import BuyNowModal from "../components/BuyNowModal";

export default function WishlistPage() {
  const { state, dispatch } = useContext(ShopContext);
  const wishlist = state.wishlist;

  const [showBuyNow, setShowBuyNow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div>
        <UserNavbar />
        <h3 className="text-center mt-5">Your Wishlist is Empty ❤️</h3>
      </div>
    )
  }

  const handleRemove = async (productId) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
  };

  const handleBuyNowClick = (product) => {
    setSelectedProduct({ ...product, quantity: 1 });
    setShowBuyNow(true);
  };


  return (
    <div className="container-fluid">
      <UserNavbar />
      <h2 className="text-center pastel-border mt-3 py-3">Your Wishlist ❤️</h2>
      
      <div className="row w-75 mx-auto">
        {state.wishlist.length === 0 ? (
          <p className="text-center">No items in wishlist.</p>
        ) : (

          wishlist.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img src={`http://localhost:5000/uploads/${product.image}`} className="card-img-top" alt={product.title} />

                <div className="card-body text-center">
                  <h5>{product.title}</h5>
                  <p>{product.description}</p>
                  <p className="text-success fw-bold">₹{product.price}</p>

                  <div className="d-flex justify-content-around">
                    <button className="btn btn-warning" variant="success"
                    onClick={() => handleBuyNowClick(product)}>Buy Now ✨</button>
                    <button className="btn btn-outline-danger" onClick={() => handleRemove(product._id)}>
                      <FaHeart color="red" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Buy Now Modal */}
      {selectedProduct && (
        <BuyNowModal
          show={showBuyNow}
          handleClose={() => setShowBuyNow(false)}
          product={selectedProduct}
          quantity={1}
        />
      )}
    </div>
  );
}
