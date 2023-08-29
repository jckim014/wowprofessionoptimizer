const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemas define the structure of the documents, models "wrap around"
const enchantingRecipeSchema = new Schema(
  {
    itemName: String,
    recipeID: Number,
    reagentList: [],
    learnedAt: Number,
    difficultyColors: [], // 4 element array: Orange, Yellow, Green, Gray
    craftingCost: Number, //[]
    icon: String,
    link: String,
  },
  { timestamps: true } // not sure if this is helpful
);

const enchantingRecipe = mongoose.model(
  "enchanting_recipe",
  enchantingRecipeSchema
);

module.exports = enchantingRecipe;
