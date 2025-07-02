import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const categories = [
    { name: "Hamper", image: "/images/Hamper.png" },
    { name: "Bows", image: "/images/Bows.png" },
    { name: "Scrunchies", image: "/images/Scrunchies.png" },
    { name: "Bracelets", image: "/images/Bracelets.webp" },
    { name: "Earring", image: "/images/Earring.webp" },
    { name: "Neckchains", image: "/images/Chain.webp" },
];

export default function UserHome() {
    const navigate = useNavigate();
    const [latestProducts, setLatestProducts] = useState([]);

    // scroll
    const latestRef = useRef(null);

    const scrollToLatest = () => {
        if (latestRef.current) {
            latestRef.current.scrollIntoView({ behavior : "smooth" });
        }
    }

    // Fetch the latest 6 products
    useEffect(() => {
        axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
            const sorted = res.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
            setLatestProducts(sorted);
        })
        .catch(() => alert("Error fetching latest products"));
    }, []);

    // Submit Contact
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
        };
        
        try {
            await axios.post("http://localhost:5000/api/contact", payload);
            alert("Message sent successfully!");
            e.target.reset();
        } 
        catch (error) {
            alert("Failed to send message.");
            console.error(error);
        }
    };

    return (
        <div>
            <UserNavbar />
            
            <div className="container-fluid mt-4">
                <h3 className="w-100 text-center py-3 pastel-border">Welcome to ShopSwift 🛍 ✨</h3>

                {/* Carousel */}
                <div id="bannerCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/images/Banner1.png" className="d-block w-75 mx-auto carousel-img rounded" alt="Banner 1" />
                        </div>

                        <div className="carousel-item">
                            <img src="/images/Banner2.png" className="d-block w-75 mx-auto carousel-img rounded" alt="Banner 2" />
                        </div>
                
                        <div className="carousel-item">
                            <img src="/images/Banner3.png" className="d-block w-75 mx-auto carousel-img rounded" alt="Banner 3" />
                        </div>
                    </div>
            
                    <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                    </button> 
                    <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Category Section */}
            <div className="container-fluid mt-5">
                <h3 className="w-100 text-center py-3 pastel-border">Our Collections 🛒</h3>

                <div className="row mt-4 w-75 mx-auto">
                    {categories.map((cat, idx) => (
                        <div className="col-md-4 mb-4" key={idx}>
                            <div className="card h-70 shadow-sm hover-shadow border-0" 
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}>
                                <img src={cat.image} className="card-img-top" alt={cat.name} />

                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{cat.name}</h5>
                                    <p className="card-text text-muted">Explore our latest {cat.name} collection.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Latest collection */}
            <div className="container-fluid mt-5">
                <div className="row align-item-center latest py-4 w-75 mx-auto rounded">
                    <div className="col-md-6 text-center md-4 mb-md-0">
                        <img src="/images/Promotion.webp" alt="latest-collection" 
                        className="img-fluid w-50"/>
                    </div>

                    <div className="col-md-6 mt-5 text-center">
                        <h2>Latest Collection</h2>
                        <p  className="text-muted fs-5">Elevate your everyday look with our latest Minimal Jewelry Collection. Designed for effortless elegance, each piece blends simplicity with timeless charm. Perfect for daily wear and subtle styling.</p>
                        <button className="btn btn-outline-info" onClick={scrollToLatest}>See More</button>
                    </div>
                </div>
            </div>

            {/* Why Us */}
            <div className="container-fluid mt-5">
                <h3 className="text-center py-3 pastel-border">Why Us 💖</h3>

                <div className="row py-3 text-center w-75 mx-auto">
                    {/* Fast Delivery */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                            <div className="card-body">
                                <i className="bi bi-truck fs-1 text-info mb-3"></i>
                                <h5 className="card-title fw-bold">Fast Delivery</h5>
                                <p className="card-text text-muted">We ensure your gifts are delivered promptly to make every moment special.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Free Shipping */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                            <div className="card-body">
                                <i className="bi bi-box-seam fs-1 text-info mb-3"></i>
                                <h5 className="card-title fw-bold">Free Shipping</h5>
                                <p className="card-text text-muted">Enjoy free shipping on all orders without any minimum value.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Best Quality */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                            <div className="card-body">
                                <i className="bi bi-gem fs-1 text-info mb-3"></i>
                                <h5 className="card-title fw-bold">Best Quality</h5>
                                <p className="card-text text-muted">Our products are crafted with love and top-grade materials for lasting impressions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="client_section mt-5">
                <div className="container-fluid">
                    <div className="heading_container text-center mb-4">
                        <h2 className="pastel-border py-2">Customer Testimonials 💬</h2>
                    </div>

                    <div id="testimonialCarousel" className="carousel slide carousel-fade py-3" data-bs-ride="carousel">
                        <div className="carousel-inner w-75 mx-auto">
                            <div className="carousel-item active">
                                <div className="box bg-light p-4 shadow rounded testimonial-box">
                                    <div className="client_info d-flex align-items-center justify-content-between">
                                        <div className="client_name">
                                            <h5>Morijorch</h5>
                                            <h6 className="text-muted">Gift Buyer</h6>
                                        </div>
                                        
                                        <i className="fa fa-quote-left fa-2x text-info"></i>
                                    </div>
                                    
                                    <p className="mt-3 text-muted">
                                        “ShopSwift made my gifting so simple! The hampers are beautiful and arrived super quick. Highly recommended!”
                                    </p>
                                </div>
                            </div>
                            
                            <div className="carousel-item">
                                <div className="box bg-light p-4 shadow rounded testimonial-box">
                                    <div className="client_info d-flex align-items-center justify-content-between">
                                        <div className="client_name">
                                            <h5>Rochak</h5>
                                            <h6 className="text-muted">Returning Customer</h6>
                                        </div>
                                        
                                        <i className="fa fa-quote-left fa-2x text-info"></i>
                                    </div>
                                    
                                <p className="mt-3 text-muted">
                                    “Absolutely love their scrunchies and bows! The quality and packaging are top-notch. My daughter is obsessed!”
                                </p>
                                </div>
                            </div>
                        
                            <div className="carousel-item">
                                <div className="box bg-light p-4 shadow rounded testimonial-box">
                                    <div className="client_info d-flex align-items-center justify-content-between">
                                        <div className="client_name">
                                            <h5>Brad Johns</h5>
                                            <h6 className="text-muted">Corporate Client</h6>
                                        </div>
                                    
                                        <i className="fa fa-quote-left fa-2x text-info"></i>
                                    </div>
                                
                                    <p className="mt-3 text-muted">
                                        “We bulk ordered gift boxes for our team — delivered on time and beautifully wrapped. Excellent customer support!”
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <div className="carousel_btn-box d-flex justify-content-center mt-4">
                            <button className="custom-carousel-btn bg-info me-2" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                                <i className="fa fa-angle-left fa-2x text-white"></i>
                            </button>

                            <button className="custom-carousel-btn bg-info" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                                <i className="fa fa-angle-right fa-2x text-white"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div> 

            {/* Latest arrivals */}
            <div className="container-fluid mt-5" ref={latestRef}>
                <h3 className="text-center pastel-border py-2">Latest Arrivals 🎁</h3>

                <div className="row py-3 w-75 mx-auto">
                    {latestProducts.map((product, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card h-100 shadow-sm">
                                {product.image && (
                                    <img src={`http://localhost:5000/uploads/${product.image}`}
                                    className="card-img-top" alt={product.title} />
                                )}
                                
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="text-success fw-bold">₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Valentine's Day Special Section */}
            <div className="container-fluid mt-5">
                <h3 className="text-center pastel-border py-2">Gift Your Loved One 🎁</h3>

                <div className="row align-items-center w-75 mx-auto rounded shadow-sm p-4 my-4" style={{ backgroundColor: "#ffe6e5" }}>
                    <div className="col-md-6 text-center mb-4 mb-md-0">
                        <h2 className="fw-bold text-danger mb-3">Valentine's Day Gift Picks ❤️</h2>
                        <p className="text-muted fs-5">
                            Make this Valentine's Day unforgettable with our handpicked romantic gifts. 
                            From cute accessories to thoughtful hampers, find the perfect way to say <br /> "I love you ❤️"
                        </p>
                        <button className="btn btn-danger mt-3" onClick={() => navigate('/category/hamper')}>See More</button>
                    </div>

                    <div className="col-md-6 text-center">
                        <img src="/images/ValentinesGift.png" alt="Valentine's Day Gift"
                        className="img-fluid rounded shadow-sm w-75" />
                    </div>
                </div>
            </div>

            {/* Contact Us */}
            <div className="container-fluid mt-5 mb-5">
                <h3 className="text-center pastel-border py-2">Contact Us 📩</h3>

                <div className="row justify-content-center w-75 py-3 mx-auto">
                    <div className="col-md-8">
                        <form onSubmit={handleContactSubmit} className="bg-light p-4 shadow rounded">
                            <div className="mb-3">
                                <input type="text" className="form-control" name="name" required placeholder="Your Name" />
                            </div>

                            <div className="mb-3">
                                <input type="email" className="form-control" name="email" required placeholder="Your Email ID" />
                            </div>

                            <div className="mb-3">
                                <input type="tel" className="form-control" name="phone" required placeholder="Your Phone Number" />
                            </div>
                            
                            <div className="mb-3">
                                <textarea className="form-control" rows="4" name="message" required placeholder="Your Message"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-light pt-4 pb-3 mt-5">
                <div className="container-fluid w-75 mx-auto">
                    <div className="row">

                        {/* About */}
                        <div className="col-md-4 mb-3">
                            <h5 className="fw-bold">About ShopSwift</h5>
                            <p className="text-light">
                                ShopSwift is your go-to destination for personalized gifts and stylish accessories. 
                                We bring joy through thoughtfully curated hampers, jewelry, and more.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-md-4 mb-3">
                            <h5 className="fw-bold">Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-decoration-none text-light">Home</a></li>
                                <li><a href="#collections" className="text-decoration-none text-light">Collections</a></li>
                                <li><a href="#contact" className="text-decoration-none text-light">Contact Us</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-md-4 mb-3">
                            <h5 className="fw-bold">Contact</h5>
                            <p className="text-light mb-1"><i className="bi bi-envelope"></i> vaishukathir17@gmail.com</p>
                            <p className="text-light mb-1"><i className="bi bi-phone"></i> +91 98765 43210</p>
                            <p className="text-light"><i className="bi bi-geo-alt"></i> Coimbatore, Tamil Nadu</p>
                        </div>
                    </div>

                    <hr className="border-secondary" />

                    <div className="text-center text-light">
                        &copy; {new Date().getFullYear()} ShopSwift. All rights reserved.
                    </div>
                </div>
            </footer>

        </div>
    );
}
