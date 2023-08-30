const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemas define the structure of the documents, models "wrap around"
const inscriptionRecipeSchema = new Schema(
  {
    itemName: String,
    recipeID: Number,
    craftedItemID: Number,
    reagentList: [],
    learnedAt: Number,
    difficultyColors: [], // 4 element array: Orange, Yellow, Green, Gray
    craftingCost: Number, //[]
    icon: String,
    link: String,
  },
  { timestamps: true } // not sure if this is helpful
);

const inscriptionRecipe = mongoose.model(
  "inscription_recipe",
  inscriptionRecipeSchema
);

module.exports = inscriptionRecipe;
