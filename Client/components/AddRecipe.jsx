import React, { useState } from "react";
import "./AddRecipe.css"; 

export default function AddRecipe({ onClose, onAddRecipe }) {
  const [recipe, setRecipe] = useState({
    title: "",
    instructions: "",
    ingredients: [{ name: "", quantity: "" }],
    imgUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // Add a new ingredient field
  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "" }],
    });
  };

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before submission
  
    console.log("Recipe data before sending:", recipe);
    const token = localStorage.getItem("authToken"); // Get the token from localStorage

    if (!token) {
      setError("You must be logged in to add a recipe."); // Display error message
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in request header
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();

      console.log("API Response:", data); //
      if (response.ok && data.recipe) {
        onAddRecipe(data.recipe); // Update home page with new recipe
        setRecipe({ title: "", instructions: "", ingredients: [{ name: "", quantity: "" }], imgUrl: "" }); // Reset form
        onClose(); // Close modal
      } else {
        setError(data.message || "Failed to add recipe.");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Recipe</h2>

        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={recipe.title} onChange={handleChange} required />

          <label>Instructions:</label>
          <textarea name="instructions" value={recipe.instructions} onChange={handleChange} required />

          <label>Image URL:</label>
          <input type="text" name="imgUrl" value={recipe.imgUrl} onChange={handleChange} required />

          <label>Ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-ingredient-btn">+ Add Ingredient</button>

          {/* Show error message if any */}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="modal-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Submit"}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
