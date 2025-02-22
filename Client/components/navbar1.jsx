import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function Navbar1() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear user authentication data if stored (example: localStorage)
    localStorage.removeItem('userToken');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="custom-navbar1">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand">The Recipe Haven</a>

          {/* Search + Add Recipe + Logout Container */}
          <div className="d-flex align-items-center">
            <div className="search-container">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </div>
            
            {/* Add Recipe Button */}
            <button className="btn btn-primary add-recipe-btn">Add Recipe</button>

            {/* Logout Button */}
            <button className="btn btn-danger logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
