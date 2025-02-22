import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import axios from "axios"

export default function Register() {
  const navigate = useNavigate(); // React Router navigation function

  // Form data state to manage inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Errors state for validation messages
  const [errors, setErrors] = useState({
    username: "",
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

    // Username validation
    if (!formData.username) {
      valid = false;
      validationErrors.username = "Username is required";
    }

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
      
      async function createAccount() {
        try {
          const response = await axios.post("http://localhost:5000/api/register", {name: formData.username, gmail: formData.email, password: formData.password})
          if (response.status === 200) {
            navigate("/login");
            alert("User registered")
          }
        } catch (error) {
          if (error.response) {
            const {status, data} = error.response;
            const {message} = data;

            if (status === 400) {
              alert(message)
            } else if (status === 500) {
              alert(message)
            }
          } else if (error.request) {
            alert("Network Error", error)
          } else {
            alert("Axios Error", error)
          }
        }
      }
      await createAccount();
    }
  };

  return (
    <div>
      <Navbar loginVisible={false} />
      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <p>Enter the following information to create an account</p>

          {/* Username Input */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </div>

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
            Already Have an Account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
