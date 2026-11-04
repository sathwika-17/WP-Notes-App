import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      toast.success("Login successful");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(localStorage.getItem("token"));

      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>📝 Notes App</h1>
        <p>Welcome Back</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="bottom-text">
          <Link to="/signup">Create New Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
