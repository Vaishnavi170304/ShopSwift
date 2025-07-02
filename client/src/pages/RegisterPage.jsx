
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.email === "admin@gmail.com" && form.password === "admin@swift") {
      alert("Admin account cannot be registered here.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        ...form, role: 'user',
      });
      alert('Registration successful');
      navigate("/login");
    } catch (err) {
      alert("User already exists or registration failed.");
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
            <div className="col-12 col-md-6">
              <h2 className="text-center m-4">Register</h2>
              <form onSubmit={submit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control mb-3"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <div className="text-center">
                  <button className="btn btn-primary px-4">Register</button>
                </div>
              </form>
              <p className="mt-4 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
