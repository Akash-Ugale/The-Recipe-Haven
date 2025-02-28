import express from 'express'

import {add,getAllRecipe, getRecipeById, getRecipeByUserId, savedRecipeById,getSavedRecipe} from '../controllers/recipe.js';
import { Authenticate } from '../middlewares/auth.js';
const router = express.Router();

// create Recipe 
router.post('/add',Authenticate,add)

// get all recipe
router.get('/',getAllRecipe);

// get all saved recipe
router.get('/saved',Authenticate,getSavedRecipe)

// get recipe by userId
router.get('/user/:id',getRecipeByUserId)


// get recipe by Id
router.get('/:id',getRecipeById)

// savedRecipe by Id
router.post('/:id',Authenticate,savedRecipeById)

export default router;

