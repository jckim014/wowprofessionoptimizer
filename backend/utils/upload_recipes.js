const engineerSource = require("../wowhead_jsons/engineer.json");
const alchemySource = require("../wowhead_jsons/alchemy.json");
const blacksmithingSource = require("../wowhead_jsons/blacksmithing.json");
const cookingSource = require("../wowhead_jsons/cooking.json");
const enchantingSource = require("../wowhead_jsons/enchanting.json");

const engineerIcons = require("../icons/engineer_icons.json");
const alchemyIcons = require("../icons/alchemy_icons.json");
const blacksmithingIcons = require("../icons/blacksmithing_icons.json");
const cookingIcons = require("../icons/cooking_icons.json");
const enchantingIcons = require("../icons/enchanting_icons.json");

const EngineeringRecipe = require("../models/engineering.js");
const AlchemyRecipe = require("../models/alchemy.js");
const BlacksmithingRecipe = require("../models/blacksmithing.js");
const CookingRecipe = require("../models/cooking.js");
const EnchantingRecipe = require("../models/enchanting.js");

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

function uploadBlacksmithing() {
  // Filter out uncraftable items
  const filteredRecipes = blacksmithingSource.filter(
    (recipe) => recipe.hasOwnProperty("creates") // need to update this - personal enchantments don't create but can be used for skillups
  );
  // Convert all recipes into mongoose model format
  const formattedRecipes = filteredRecipes.map((recipe) => {
    let convertedString = recipe.name.replace(/\s/g, "-");

    return new BlacksmithingRecipe({
      itemName: recipe.name,
      recipeID: recipe.id,
      craftedItemID: recipe.creates[0],
      reagentList: recipe.reagents,
      learnedAt: recipe.learnedat,
      difficultyColors: recipe.colors,
      craftingCost: 0, // Need to run update-crafting-costs afterwards
      quantityCreated: recipe.creates[1], // Part of the creates property, TODO: update for variable quantity
      icon: `https://wow.zamimg.com/images/wow/icons/large/${
        blacksmithingIcons[recipe.creates[0]].icon
      }.jpg`,
      link: `https://wowhead.com/wotlk/spell=${recipe.id}/${convertedString}`,
    });
  });
  // Save recipes to mongoDB atlas
  formattedRecipes.forEach((recipe) => recipe.save());
}

function uploadCooking() {
  // Filter out uncraftable items
  const filteredRecipes = cookingSource.filter(
    (recipe) => recipe.hasOwnProperty("creates") // need to update this - personal enchantments don't create but can be used for skillups
  );
  // Convert all recipes into mongoose model format
  const formattedRecipes = filteredRecipes.map((recipe) => {
    let convertedString = recipe.name.replace(/\s/g, "-");

    return new CookingRecipe({
      itemName: recipe.name,
      recipeID: recipe.id,
      craftedItemID: recipe.creates[0],
      reagentList: recipe.reagents,
      learnedAt: recipe.learnedat,
      difficultyColors: recipe.colors,
      craftingCost: 0, // Need to run update-crafting-costs afterwards
      quantityCreated: recipe.creates[1], // Part of the creates property, TODO: update for variable quantity
      icon: `https://wow.zamimg.com/images/wow/icons/large/${
        cookingIcons[recipe.creates[0]].icon
      }.jpg`,
      link: `https://wowhead.com/wotlk/spell=${recipe.id}/${convertedString}`,
    });
  });
  // Save recipes to mongoDB atlas
  formattedRecipes.forEach((recipe) => recipe.save());
}

function uploadEnchanting() {
  const filteredRecipes = enchantingSource;
  // const filteredRecipes = enchantingSource.filter(
  //   (recipe) => recipe.hasOwnProperty("creates")
  // );
  // Convert all recipes into mongoose model format
  const formattedRecipes = filteredRecipes.map((recipe) => {
    let convertedString = recipe.name.replace(/\s/g, "-");

    return new EnchantingRecipe({
      itemName: recipe.name,
      recipeID: recipe.id,
      reagentList: recipe.reagents,
      learnedAt: recipe.learnedat,
      difficultyColors: recipe.colors,
      craftingCost: 0, // Need to run update-crafting-costs afterwards
      icon: `https://wow.zamimg.com/images/wow/icons/large/${
        enchantingIcons[recipe.id].icon
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
  blacksmithing: uploadBlacksmithing,
  cooking: uploadCooking,
  enchanting: uploadEnchanting,
};
