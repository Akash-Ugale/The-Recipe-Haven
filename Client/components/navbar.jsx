
import React from "react";
import { useNavigate } from "react-router-dom";  

export default function Navbar(props) {
    const loginVisible = props.loginVisible ?? true;
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-nav">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          The Recipe Haven
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex" role="search">
            {loginVisible && (
                <button
                onClick={() => navigate("/login")} 
                className="btn btn-primary"
                type="button"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
