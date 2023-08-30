const EngineeringRecipe = require("../models/engineering.js");
const AlchemyRecipe = require("../models/alchemy.js");
const BlacksmithingRecipe = require("../models/blacksmithing.js");
const CookingRecipe = require("../models/cooking.js");
const EnchantingRecipe = require("../models/enchanting.js");
const FirstaidRecipe = require("../models/firstaid.js");
const InscriptionRecipe = require("../models/inscription.js");
const JewelcraftingRecipe = require("../models/jewelcrafting.js");
const LeatherworkingRecipe = require("../models/leatherworking.js");
const TailoringRecipe = require("../models/tailoring.js");

const calculate = require("./calculate.js");

async function updateCost(priceData, profession) {
  // Retrieve all recipes from database

  let allRecipes;

  switch (profession) {
    case "Engineering":
      allRecipes = await EngineeringRecipe.find().lean();
      break;
    case "Alchemy":
      allRecipes = await AlchemyRecipe.find().lean();
      break;
    case "Blacksmithing":
      allRecipes = await BlacksmithingRecipe.find().lean();
      break;
    case "Cooking":
      allRecipes = await CookingRecipe.find().lean();
      break;
    case "Enchanting":
      allRecipes = await EnchantingRecipe.find().lean();
    case "First Aid":
      allRecipes = await FirstaidRecipe.find().lean();
    case "Inscription":
      allRecipes = await InscriptionRecipe.find().lean();
    case "Jewelcrafting":
      allRecipes = await JewelcraftingRecipe.find().lean();
    case "Leatherworking":
      allRecipes = await LeatherworkingRecipe.find().lean();
    case "Tailoring":
      allRecipes = await TailoringRecipe.find().lean();
  }

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
    switch (profession) {
      case "Engineering":
        recipeDoc = await EngineeringRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Alchemy":
        recipeDoc = await AlchemyRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Blacksmithing":
        recipeDoc = await BlacksmithingRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Cooking":
        recipeDoc = await CookingRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Enchanting":
        recipeDoc = await EnchantingRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "First Aid":
        recipeDoc = await FirstaidRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Inscription":
        recipeDoc = await InscriptionRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Jewelcrafting":
        recipeDoc = await JewelcraftingRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Leatherworking":
        recipeDoc = await LeatherworkingRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
      case "Tailoring":
        recipeDoc = await TailoringRecipe.findOneAndUpdate(
          {
            recipeID: recipe.recipeID,
          },
          { craftingCost: recipe.craftingCost }
        );
        break;
    }
  });
}

module.exports = {
  updateCost: updateCost,
};
