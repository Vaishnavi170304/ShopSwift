import { useState } from "react";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";

export default function AdminDashboard() {
    const [tab, setTab] = useState("add");
    
    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }; 
    
    return (
        <div>
            {/* Navbar Styled Header */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <span className="navbar-brand">🛒 ShopSwift Admin</span>

                <div className="ms-auto d-flex">
                    <button
                        className={`btn btn-${tab === "add" ? "light" : "outline-light"} me-2`}
                        onClick={() => setTab("add")} 
                    > Add Product </button>
                    <button
                        className={`btn btn-${tab === "view" ? "light" : "outline-light"} me-3`} 
                        onClick={() => setTab("view")} 
                    > View Products </button>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            </nav>

            {/* Page Content */}
            <div className="container mt-4">
                {tab === "add" ? (
                    <AddProduct onProductAdded={() => setTab("view")} />
                ) : (
                    <ViewProduct />
                )}
            </div>
        </div>
    );
}
