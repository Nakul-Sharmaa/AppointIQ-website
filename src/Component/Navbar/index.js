import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "mdb-ui-kit/css/mdb.min.css";
import 'mdb-ui-kit/js/mdb.es.min.js';
import "./index.css";

export default function Navbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login
  const [imageSrc, setImageSrc] = useState("https://your-api-url.com/user-profile.jpg");
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    window.mdb?.AutoInit?.();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageError = () => {
    setImageSrc("/default-doctor-logo.jpg");
  };

  const shouldShowDoctorImage = isLoggedIn && location.pathname === "/dashboard";

  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false);
    window.location.href = "/login"; // or use useNavigate() from react-router-dom
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark gradient-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">AppointIQ</a>

        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars text-light"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Links */}
          <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
            <li className="nav-item text-center mx-2 mx-lg-1">
              <a className="nav-link active" href="/">
                <i className="fas fa-home fa-lg mb-1"></i>
                <br />
                Home
              </a>
            </li>
          </ul>

          {/* Doctor Image with Dropdown */}
          {shouldShowDoctorImage && (
            <div ref={dropdownRef} className="dropdown ms-lg-3 my-3 my-lg-0">
              <img
                src={imageSrc}
                alt="Doctor"
                onError={handleImageError}
                className="rounded-circle dropdown-toggle"
                style={{ width: "50px", height: "50px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <ul className="dropdown-menu show" style={{ right: 0, left: "auto" }}>
                  <li><a className="dropdown-item" href="/profile">View Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
