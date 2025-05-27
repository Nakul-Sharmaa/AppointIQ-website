import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer footer-gradient text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p>&copy; 2025 Your Company. All Rights Reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div>
              <a href="#" className="text-white me-3 fab fa-facebook-f" title="Facebook"></a>
              <a href="#" className="text-white me-3 fab fa-twitter" title="Twitter"></a>
              <a href="#" className="text-white me-3 fab fa-linkedin-in" title="LinkedIn"></a>
              <a href="#" className="text-white fab fa-instagram" title="Instagram"></a>
            </div>
            <div>
              <a href="#" className="text-white me-3">Privacy Policy</a>
              <a href="#" className="text-white me-3">Terms of Service</a>
              <a href="#" className="text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
