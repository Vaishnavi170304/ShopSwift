
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // userId only if it exists
      if (res.data.user && res.data.user._id) {
        localStorage.setItem("userId", res.data.user._id);
      } 
      else {
        console.error("User object missing in response");
      }

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/user-home");
    } 
    catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-10 p-4 auth-bg rounded shadow">
          <div className="row">
            {/* Image Column */}
            <div className="col-md-6 text-center">
              <h1 className="mb-4">SHOPSWIFT 🛍</h1>
              <img
                src="images/frt-pg.avif"
                alt="ecommerce"
                width="100%"
                className="img-fluid rounded"
              />
            </div>

            {/* Form Column */}
            <div className="col-12 col-md-6 text-center">
              <h2 className="m-4">Login</h2>
              <form onSubmit={login}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  className="form-control m-3" 
                  value={form.email} 
                  onChange={handleChange} 
                />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  className="form-control m-3" 
                  value={form.password} onChange={handleChange} 
                />
                <div className="text-center">
                  <button className="btn btn-primary px-4">Login</button>
                </div>
              </form>
              <p className="mt-4 text-center">
                Don't have an account? <Link to="/">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
