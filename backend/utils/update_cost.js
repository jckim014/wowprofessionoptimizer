const EngineeringRecipe = require("../models/engineering.js");
const AlchemyRecipe = require("../models/alchemy.js");

const calculate = require("./calculate.js");

async function updateEngineering(priceData) {
  // Retrieve all recipes from database
  const allRecipes = await EngineeringRecipe.find().lean();

  // Calculate the total cost and whether to craft or buy each reagent: return an object/array with this info
  const updatedRecipes = allRecipes.map((recipe) => {
    const currentReagents = recipe.reagentList;

    const reagentCosts = currentReagents.map((reagent) => {
      individualCost = calculate.priceLookup(reagent[0], priceData);
      return individualCost * reagent[1]; // individual cost x quantity
    });

    const totalCost = reagentCosts.reduce((a, b) => {
      return a + b;
    });

    recipe.craftingCost = totalCost;
    return recipe;
  });

  // Update each craftingCost of each recipe in mongodb
  updatedRecipes.forEach(async (recipe) => {
    const recipeDoc = await EngineeringRecipe.findOneAndUpdate(
      {
        recipeID: recipe.recipeID,
      },
      { craftingCost: recipe.craftingCost }
    );
  });
}

async function updateAlchemy(priceData) {
  // Retrieve all recipes from database
  const allRecipes = await AlchemyRecipe.find().lean();

  // Calculate the total cost and whether to craft or buy each reagent: return an object/array with this info
  const updatedRecipes = allRecipes.map((recipe) => {
    const currentReagents = recipe.reagentList;

    const reagentCosts = currentReagents.map((reagent) => {
      individualCost = calculate.priceLookup(reagent[0], priceData);
      return individualCost * reagent[1]; // individual cost x quantity
    });

    const totalCost = reagentCosts.reduce((a, b) => {
      return a + b;
    });

    recipe.craftingCost = totalCost;
    return recipe;
  });

  // Update each craftingCost of each recipe in mongodb
  updatedRecipes.forEach(async (recipe) => {
    const recipeDoc = await AlchemyRecipe.findOneAndUpdate(
      {
        recipeID: recipe.recipeID,
      },
      { craftingCost: recipe.craftingCost }
    );
  });
}

module.exports = {
  engineering: updateEngineering,
  alchemy: updateAlchemy,
};
