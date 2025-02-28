import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function Navbar1({ onAddRecipe }) {  // Accept onAddRecipe as a prop
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear user authentication data
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="custom-navbar1">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand">The Recipe Haven</a>

          <div className="nav-buttons">
            
            {/* Add Recipe Button */}
            <button className="btn btn-primary add-recipe-btn" onClick={onAddRecipe}>Add Recipe</button>

            {/* Saved Recipe Button */}
            {/* <button className="btn btn-warning saved-recipe-btn">Saved Recipe</button> */}

            {/* Logout Button */}
            <button className="btn btn-danger logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
