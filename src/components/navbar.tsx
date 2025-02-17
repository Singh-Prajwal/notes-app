import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.className = darkMode
      ? "bg-dark text-light"
      : "bg-light text-dark";
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar fixed-top shadow ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* App Name */}
        <Link
          className={`navbar-brand fs-4 ms-3 ${darkMode ? "text-light" : "text-dark"}`}
          to="/"
        >
          📝 NotesApp
        </Link>

        {/* Dark Mode Toggle */}

        {/* User Actions */}
        <div className="d-flex align-items-center">
          <button
            className={`btn ${darkMode ? "btn-light" : "btn-dark"} me-3`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          {userId ? (
            <>
              <span className={`me-3 ${darkMode ? "text-white" : "text-dark"}`}>
                Welcome, {username}!
              </span>
              <button className="btn btn-danger me-3" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-primary me-3" to="/signup">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
