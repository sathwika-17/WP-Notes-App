import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">📝</span>
        <span>Notes App</span>
      </Link>

      {user ? (
        <div className="navbar-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      ) : null}

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="profile-icon" title="Profile">
              {user?.name?.charAt(0).toUpperCase()}
            </Link>

            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <Link to="/signup" className="auth-link primary">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
