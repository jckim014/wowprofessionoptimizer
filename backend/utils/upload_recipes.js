const engineerSource = require("../recipe_jsons/engineer.json");
const alchemySource = require("../recipe_jsons/alchemy.json");

const engineerIcons = require("../icons/engineer_icons.json");
const alchemyIcons = require("../icons/alchemy_icons.json");

const EngineeringRecipe = require("../models/engineering.js");
const AlchemyRecipe = require("../models/alchemy.js");

function uploadEngineering() {
  // Filter out uncraftable items
  const filteredRecipes = engineerSource.filter(
    (recipe) => recipe.hasOwnProperty("creates") // need to update this - personal enchantments don't create but can be used for skillups
  );
  // Convert all recipes into mongoose model format
  const formattedRecipes = filteredRecipes.map((recipe) => {
    let convertedString = recipe.name.replace(/\s/g, "-");

    return new EngineeringRecipe({
      itemName: recipe.name,
      recipeID: recipe.id,
      craftedItemID: recipe.creates[0],
      reagentList: recipe.reagents,
      learnedAt: recipe.learnedat,
      difficultyColors: recipe.colors,
      craftingCost: 0, // Need to run update-crafting-costs afterwards
      quantityCreated: recipe.creates[1], // Part of the creates property, TODO: update for variable quantity
      icon: `https://wow.zamimg.com/images/wow/icons/large/${
        engineerIcons[recipe.creates[0]].icon
      }.jpg`,
      link: `https://wowhead.com/wotlk/spell=${recipe.id}/${convertedString}`,
    });
  });
  // Save recipes to mongoDB atlas
  formattedRecipes.forEach((recipe) => recipe.save());
}

function uploadAlchemy() {
  // Filter out uncraftable items
  const filteredRecipes = alchemySource.filter(
    (recipe) => recipe.hasOwnProperty("creates") // need to update this - personal enchantments don't create but can be used for skillups
  );
  // Convert all recipes into mongoose model format
  const formattedRecipes = filteredRecipes.map((recipe) => {
    let convertedString = recipe.name.replace(/\s/g, "-");

    return new AlchemyRecipe({
      itemName: recipe.name,
      recipeID: recipe.id,
      craftedItemID: recipe.creates[0],
      reagentList: recipe.reagents,
      learnedAt: recipe.learnedat,
      difficultyColors: recipe.colors,
      craftingCost: 0, // Need to run update-crafting-costs afterwards
      quantityCreated: recipe.creates[1], // Part of the creates property, TODO: update for variable quantity
      icon: `https://wow.zamimg.com/images/wow/icons/large/${
        alchemyIcons[recipe.creates[0]].icon
      }.jpg`,
      link: `https://wowhead.com/wotlk/spell=${recipe.id}/${convertedString}`,
    });
  });
  // Save recipes to mongoDB atlas
  formattedRecipes.forEach((recipe) => recipe.save());
}

module.exports = {
  engineering: uploadEngineering,
  alchemy: uploadAlchemy,
};
