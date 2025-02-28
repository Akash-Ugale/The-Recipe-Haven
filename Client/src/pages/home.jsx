import React, { useState, useEffect } from "react";
import Navbar1 from "../../components/navbar1";
import AddRecipe from "../../components/AddRecipe";
import { saveRecipe } from "../api"; // Import saveRecipe API function
import "./home.css";

export default function Home() {
  const [recipes, setRecipes] = useState([]); 
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch recipes from MongoDB
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch recipes");
        }
    
        const data = await response.json();
    
        if (data.success && Array.isArray(data.recipes)) {
          setRecipes(data.recipes); // ✅ Store recipes properly
        } else {
          console.error("API response is not an array:", data);
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
        setRecipes([]);
      }
    };
    
    fetchRecipes();
  }, []);

  // Function to add a new recipe
  const addNewRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]); 
    setShowAddRecipe(false);
  };

  // Handle "Add Recipe" button click
  const handleAddRecipeClick = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to add a recipe.");
      return;
    }
    setShowAddRecipe(true);
  };

  // **Handle Save Recipe**
  const handleSaveRecipe = async (recipeId) => {
    if (!recipeId || recipeId.length !== 24) {
      console.error("Invalid recipeId:", recipeId);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to save a recipe.");
        return;
      }

      await saveRecipe(recipeId, token);
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "white", padding: "5px" }}>
      <Navbar1 onAddRecipe={handleAddRecipeClick} />

      {showAddRecipe && <AddRecipe onClose={() => setShowAddRecipe(false)} onAddRecipe={addNewRecipe} />}

      <div className="recipe-container">
        {expandedRecipe === null ? (
          recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <img src={recipe.imgUrl} alt={recipe.title} className="recipe-image" />
                <h3>{recipe.title}</h3>
                <button className="btn btn-primary" onClick={() => setExpandedRecipe(index)}>See More</button>
                <button className="btn btn-success" onClick={() => handleSaveRecipe(recipe._id)}>Save</button> 
              </div>
            ))
          ) : (
            <p>No Recipes Available</p>
          )
        ) : (
          expandedRecipe < recipes.length ? (
            <div className="recipe-card expanded">
              <h3>{recipes[expandedRecipe].title}</h3>
              <h4 className="highlighted">Instructions</h4>
              <p className="cursive-text">{recipes[expandedRecipe].instructions}</p>

              {recipes[expandedRecipe].ingredients?.length > 0 && (
                <>
                  <h4 className="highlighted">Ingredients</h4>
                  <ul>
                    {recipes[expandedRecipe].ingredients.map((ingredient, i) => (
                      <li key={i} className="cursive-text">{ingredient.name}</li>
                    ))}
                  </ul>
                </>
              )}

              <button className="btn btn-danger" onClick={() => setExpandedRecipe(null)}>Back to Home</button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
