import { Recipe } from "../Models/recipe.js";
import { SavedRecipe } from "../Models/SavedRecipe.js";
import mongoose from "mongoose";

export const add = async (req, res) => {
  try {
    const { title, instructions, ingredients, imgUrl } = req.body;

    const recipe = await Recipe.create({
      title,
      instructions,
      ingredients,
      imgUrl,
      user: req.user._id,
    });

    res.status(201).json({ message: "Recipe Created Successfully!", recipe });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to create recipe", error: error.message });
  }
};

export const getAllRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    console.log("Fetched Recipes:", recipes); // ✅ Debugging
    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch recipes",
        error: error.message,
      });
  }
};

// Get recipe by ID
/* export const getRecipeById = async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) return res.status(404).json({ message: "Recipe does not exist" });

    res.status(200).json({ message: "Recipe found", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Recipe ID" });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe)
      return res.status(404).json({ message: "Recipe does not exist" });

    res.status(200).json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recipes by user ID
export const getRecipeByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const recipes = await Recipe.find({ user: userId });

    if (!recipes.length)
      return res
        .status(404)
        .json({ message: "No recipes found for this user" });

    res.status(200).json({ message: "Recipes by user", recipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save a recipe by ID
export const savedRecipeById = async (req, res) => {
  const recipeId = req.params.id;

  try {
    let savedRecipe = await SavedRecipe.findOne({
      recipe: recipeId,
      user: req.user._id,
    });

    if (savedRecipe)
      return res.status(409).json({ message: "Recipe already saved" });

    savedRecipe = await SavedRecipe.create({
      recipe: recipeId,
      user: req.user._id,
    });

    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get saved recipes for the logged-in user
export const getSavedRecipe = async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find({
      user: req.user._id,
    }).populate("recipe");

    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* import { Recipe } from "../Models/recipe.js";
import {SavedRecipe} from '../Models/SavedRecipe.js'
export const add = async (req,res) =>{
    const {title, inst,ing1,ing2,ing3,ing4,qty1,
          qty2,qty3,qty4,imgUrl
    } = req.body;

    try{
        const recipe = await Recipe.create({
            title, inst,ing1,ing2,ing3,ing4,qty1,
          qty2,qty3,qty4,imgUrl,
          user:req.user,
        });

        res.json({message:"Recipe Created Successfully..!",recipe})
    }catch(error) {
        res.json({message:error})
    }
}


export const getAllRecipe = async(req,res)=>{
    const recipe = await Recipe.find();
    res.json({recipe})
}

export const getRecipeById = async (req,res)=>
{
    const id = req.params.id

    try{
        let recipe = await Recipe.findById(id)

        if(!recipe) res.json({message:'recipe not exist'})
        
        res.json({message:"recipe by id",recipe})
    }catch(error)
    {
        res.json({message:error})
    }
}


export const getRecipeByUserId = async(req,res)=>{
    const userId = req.params.id

    try{
        let recipe = await Recipe.find({user:userId})

        if(!recipe) res.json({message:'recipe not exist'})
        
        res.json({message:"recipe by userId",recipe})
    }catch(error)
    {
        res.json({message:error})
    }
}


export const savedRecipeById = async (req,res)=>{
    const id = req.params.id
    let recipe = await SavedRecipe.findOne({recipe:id})

    if(recipe) return res.json({message:"recipe already saved"})

    recipe = await SavedRecipe.create({recipe:id})
    res.json({message:"Recipe saved Successfully"})
}

export const getSavedRecipe = async (req,res)=>{
    const recipe = await SavedRecipe.find()

    res.json({recipe})

} */
