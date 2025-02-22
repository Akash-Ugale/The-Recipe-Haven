import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate(); // React Router navigation function

  // Form data state to manage inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Errors state for validation messages
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle form data change dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation function
  const validate = () => {
    let valid = true;
    let validationErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      valid = false;
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      valid = false;
      validationErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      valid = false;
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      valid = false;
      validationErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(validationErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate form data
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          gmail: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          // Save the token to localStorage (or sessionStorage) for persistence
          localStorage.setItem("authToken", response.data.token);

          // Redirect to Home page after successful login
          navigate("/home");
          alert(response.data.message); // Display success message (e.g., Welcome)
        } else {
          alert(response.data.message); // Show error message from backend
        }
      } catch (error) {
        alert("Login failed. Please try again later.");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Navbar loginVisible={false} />
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>Enter the following information to login to your account.</p>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <p>
            Don't have an Account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
