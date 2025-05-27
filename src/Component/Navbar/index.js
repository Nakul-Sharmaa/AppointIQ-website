import React, { useEffect } from "react";
import "mdb-ui-kit/css/mdb.min.css";
import 'mdb-ui-kit/js/mdb.es.min.js';
import "./index.css"

export default function Navbar() {
  useEffect(() => {
    // MDB requires JS initialization for components
    window.mdb?.AutoInit?.();
  }, []);

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
            {/* Add other items similarly... */}
          </ul>

          {/* Right Links */}
         {/* Right Links */}
<ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
  <li className="nav-item text-center mx-2 mx-lg-1">
    <a className="nav-link text-white" href="/login">
      <i className="fas fa-sign-in-alt fa-lg mb-1 text-white"></i>
      <br />
      Login
    </a>
  </li>
</ul>


          {/* Search */}
          <form className="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0">
            <input type="search" className="form-control" placeholder="Search" aria-label="Search" />
            <button type="button" className="btn btn-outline-light">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
