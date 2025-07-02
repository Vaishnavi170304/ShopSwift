import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4">
      <Link className="navbar-brand text-dark fw-bold" to="/home">ShopSwift 🛍️</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2">
            <Link className="nav-link text-dark fw-bold" to="/wishlist">Wishlist ❤️</Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link text-dark fw-bold" to="/cart">Cart 🛒</Link>
          </li>

          <li className="nav-item dropdown mx-2 fw-bold">
            <span className="nav-link dropdown-toggle text-dark" id="categoryDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }}>
              Categories 📦
            </span>

            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
              <li><Link className="dropdown-item fw-bold" to="/category/hamper">Hamper</Link></li>
              <li><Link className="dropdown-item fw-bold" to="/category/bows">Bow</Link></li>
              <li><Link className="dropdown-item fw-bold" to="/category/scrunchies">Scrunchies</Link></li>
              <li><Link className="dropdown-item fw-bold" to="/category/bracelets">Bracelet</Link></li>
              <li><Link className="dropdown-item fw-bold" to="/category/earring">Earring</Link></li>
              <li><Link className="dropdown-item fw-bold" to="/category/neckchains">Neckchains</Link></li>
            </ul>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link text-dark fw-bold" to="/my-orders">My Orders 🎁</Link>
          </li>

          <li className="nav-item ms-3">
            <button className="btn btn-outline-light fw-bold" onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
