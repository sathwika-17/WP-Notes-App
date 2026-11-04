import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>📝 Notes App</h1>
        <p>Create Your Account</p>

        <form onSubmit={handleSubmit} autoComplete="new-password">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <label className="show-password">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          <button type="submit">
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
