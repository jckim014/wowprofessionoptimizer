const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemas define the structure of the documents, models "wrap around"
// Work on validation letter as a "nice to have"

const engineeringRecipeSchema = new Schema(
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

const engineeringRecipe = mongoose.model(
  "engineering_recipe",
  engineeringRecipeSchema
);

module.exports = engineeringRecipe;
