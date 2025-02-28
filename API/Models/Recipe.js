import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema], // List of ingredients with quantity
    imgUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/.test(value);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
export const Recipe = mongoose.model("Recipe", recipeSchema);