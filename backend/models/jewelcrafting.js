const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemas define the structure of the documents, models "wrap around"
const jewelcraftingRecipeSchema = new Schema(
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

const jewelcraftingRecipe = mongoose.model(
  "jewelcrafting_recipe",
  jewelcraftingRecipeSchema
);

module.exports = jewelcraftingRecipe;
