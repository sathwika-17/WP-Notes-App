import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Landing.css";

const Landing = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="landing-container">
        <header className="landing-hero">
          <h1>Notes App</h1>
          <p className="subtitle">
            Fast, simple and secure notes — take control of your ideas.
          </p>
          <div className="cta-row">
            <Link to="/signup" className="cta primary">
              Get Started
            </Link>
            <Link to="/login" className="cta outline">
              Login
            </Link>
          </div>
        </header>

        <section className="features">
          <div className="feature">
            <h3>Organize Quickly</h3>
            <p>Create, edit and categorize notes in seconds.</p>
          </div>
          <div className="feature">
            <h3>Search Easily</h3>
            <p>Powerful search to find notes when you need them.</p>
          </div>
          <div className="feature">
            <h3>Secure</h3>
            <p>
              Sign up and keep your notes private and backed by your account.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
