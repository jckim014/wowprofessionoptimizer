const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemas define the structure of the documents, models "wrap around"
const leatherworkingRecipeSchema = new Schema(
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

const leatherworkingRecipe = mongoose.model(
  "leatherworking_recipe",
  leatherworkingRecipeSchema
);

module.exports = leatherworkingRecipe;
