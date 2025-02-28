import mongoose from "mongoose";

const savedRecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, // Ensures a user ID is provided
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe",
    required: true, // Ensures a recipe ID is provided
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

export const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);



