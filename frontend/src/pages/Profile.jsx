import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem("user");
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Session not found</h2>
          <p>Please log in again to view your profile.</p>
          <button className="logout-btn" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar" aria-hidden="true">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <h2>{user.name || "User"}</h2>
        <p>{user.email || "No email available"}</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
