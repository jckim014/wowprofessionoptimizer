const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schemas define the structure of the documents, models "wrap around"
// Work on validation letter as a "nice to have"

const engineerRecipeSchema = new Schema(
  {
    itemName: String,
    recipeID: Number,
    craftedItemID: Number,
    reagentList: [{ reagentID: Number, reagentCost: Number, quantity: Number }],
    learnedAt: Number,
    difficultyColors: {
      // Orange, Yellow, Green, Gray
      orange: Number,
      yellow: Number,
      green: Number,
      gray: Number,
    },
    craftingCost: Number,
  },
  { timestamps: true } // not sure if this is helpful
);

const engineerRecipe = mongoose.model(
  "engineering_recipe",
  engineerRecipeSchema
);

module.exports = engineerRecipe;
