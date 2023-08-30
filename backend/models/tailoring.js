const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemas define the structure of the documents, models "wrap around"
const tailoringRecipeSchema = new Schema(
  {
    itemName: String,
    recipeID: Number,
    craftedItemID: Number,
    reagentList: [],
    learnedAt: Number,
    difficultyColors: [], // 4 element array: Orange, Yellow, Green, Gray
    craftingCost: Number, //[]
    quantityCreated: Number,
    icon: String,
    link: String,
  },
  { timestamps: true } // not sure if this is helpful
);

const tailoringRecipe = mongoose.model(
  "tailoring_recipe",
  tailoringRecipeSchema
);

module.exports = tailoringRecipe;
