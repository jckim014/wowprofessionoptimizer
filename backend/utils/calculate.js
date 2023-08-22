const fs = require("fs");

const processedRecipes = require("../recipe_storage/stored_recipes.json");
const ah_data = require("../ah_data/benediction-ally.json");
const iconsObject = require("../icons/icons.json");

const MAX_SKILL_LEVEL = 450;

function calculateGuaranteed(currentSkill) {
  let recipePath = [];
  let inventory = new Map();

  while (currentSkill < MAX_SKILL_LEVEL) {
    const craftableRecipes = processedRecipes.filter((recipe) => {
      return (
        recipe.difficultyColors[0] <= currentSkill &&
        recipe.difficultyColors[1] > currentSkill
      );
    });

    // Filter false positives (recipes without orange skill)
    const filteredRecipes = craftableRecipes.filter((recipe) => {
      // Hack to filter out weird recipes, may have to revisit
      return recipe.difficultyColors[1] - recipe.difficultyColors[0] < 50;
    });

    // Find cheapest recipe
    const [cheapestRecipe, quantityCreated, usedInventory] = getOptimalRecipe(
      filteredRecipes,
      inventory
    );
    // Remove used items from inventory
    for (let i = 0; i < usedInventory.length; i++) {
      const usedItem = usedInventory[i][0];
      const usedQuantity = usedInventory[i][1];
      inventory.set(usedItem, inventory.get(usedItem) - usedQuantity);
    }
    // Add crafted items to inventory
    const craftedItem = cheapestRecipe.craftedItemID;
    inventory.set(
      craftedItem,
      inventory.get(craftedItem) + quantityCreated || 1
    );

    // Record cheapest recipe
    recipePath.push(cheapestRecipe); // Can include other information as an array of arrays
    currentSkill = currentSkill + 1;
  }

  // Record shoppingList working backwards
  // {reagentID: {property values}}
  const shoppingList = new Map();

  for (let i = recipePath.length - 1; i >= 0; i--) {
    let currentRecipe = recipePath[i];
    let reagentList = currentRecipe.reagentList;

    // Add the required amount of reagents for crafting
    for (let j = 0; j < reagentList.length; j++) {
      let currentReagentID = reagentList[j][0];
      let reagentQuantity = reagentList[j][1];

      // Initialize reagentObject for new reagents
      let reagentObject = {};
      reagentObject.id = currentReagentID;
      reagentObject.name = iconsObject[currentReagentID].name_enus;
      reagentObject.icon = iconsObject[currentReagentID].icon;
      reagentObject.price = priceLookup(currentReagentID, ah_data);
      reagentObject.requiredAmount = reagentQuantity;

      let convertedString = iconsObject[currentReagentID].name_enus.replace(
        /\s/g,
        "-"
      );
      reagentObject.link = `https://wowhead.com/wotlk/item=${currentReagentID}/${convertedString}`;

      if (shoppingList.has(currentReagentID)) {
        let tempObject = shoppingList.get(currentReagentID);
        let tempQuantity = tempObject.requiredAmount;
        tempQuantity += reagentQuantity;
        tempObject.requiredAmount = tempQuantity;
        shoppingList.set(currentReagentID, tempObject);
      } else {
        shoppingList.set(currentReagentID, reagentObject);
      }
    }

    // Subtract finished product from required reagent list, ignore items that aren't on the list
    let craftedItemID = currentRecipe.craftedItemID;
    let craftedQuantity = currentRecipe.quantityCreated;

    if (shoppingList.has(craftedItemID)) {
      let tempObject = shoppingList.get(craftedItemID);
      let tempQuantity = tempObject.requiredAmount;
      tempQuantity -= craftedQuantity;
      tempObject.requiredAmount = tempQuantity;
      shoppingList.set(craftedItemID, tempObject);
    }
  }

  const shoppingArray = [];

  shoppingList.forEach((value, key, map) => {
    if (value.requiredAmount > 0) {
      shoppingArray.push(value);
    }
  });

  const orderedShoppingList = shoppingArray.reverse();

  storeLocal(orderedShoppingList, "optimal_path", "shopping_list");

  // Group identical items
  const groupedPath = [];
  const seenItems = new Set();

  for (let i = 0; i < recipePath.length; i++) {
    let currentID = recipePath[i].craftedItemID;
    if (seenItems.has(currentID)) {
      continue;
    }
    let count = 0;
    for (let j = i; j < recipePath.length; j++) {
      if (currentID == recipePath[j].craftedItemID) {
        count += 1;
      }
    }
    recipePath[i].quantityToCraft = count;
    groupedPath.push(recipePath[i]);
    seenItems.add(currentID);
  }

  storeLocal(groupedPath, "optimal_path", "optimal_path");

  // Send data to frontend
  let responseObject = {
    optimalPathData: groupedPath,
    shoppingListData: orderedShoppingList,
  };
  return responseObject;
}

function calculateRisky() {
  return "Risky";
}

function getOptimalRecipe(recipes, inventory) {
  minCost = Infinity;
  minIndex = 0;

  let usedInventory = [];

  // Find the cheapest recipe factoring in reagents from inventory
  for (let i = 0; i < recipes.length; i++) {
    const currentRecipe = recipes[i];
    let currentCost = recipes[i].craftingCost;

    const tempInventory = [];

    // Check if we have the reagent
    for (let j = 0; j < currentRecipe.reagentList.length; j++) {
      const currentReagent = currentRecipe.reagentList[j][0];

      let requiredQuantity = currentRecipe.reagentList[j][1];
      let inventoryQuantity = inventory.get(currentReagent);
      let usedQuantity = 0;

      // Reduce cost for each already owned reagent
      while (inventoryQuantity > 0 && requiredQuantity > 0) {
        reagentCost = priceLookup(currentReagent, ah_data);
        currentCost -= reagentCost;
        inventoryQuantity -= 1;
        requiredQuantity -= 1;
        usedQuantity += 1;
      }
      if (usedQuantity > 0) {
        tempInventory.push([currentReagent, usedQuantity]);
      }
    }

    // Update the current cheapest recipe
    // Add logic to check which recipes are less negative (more negative means using more expensive inventory)
    if (currentCost < minCost) {
      minCost = currentCost;
      minIndex = i;
      usedInventory = tempInventory;
    }
  }

  const recipeObject = recipes[minIndex];
  const quantityCreated = recipes[minIndex].quantityCreated;

  return [recipeObject, quantityCreated, usedInventory];
}

// Extremely basic for now - assumes buying all reagents and ignores unbuyable
function priceLookup(reagentID, ah_data) {
  // Check if item is craftable (possibly recursive, 1 layer for now)
  //--- if item is craftable, priceLookup on each reagent? add up all the costs

  // Check the cost on the auction house
  for (let i = 0; i < ah_data.length; i++) {
    if (ah_data[i].itemId == reagentID) {
      let price = ah_data[i].marketValue;
      return price;
    }
    // Maybe error handling would be good here?
  }

  // Compare crafted vs bought and return (price + method)
  return 999999999; // Hack to ignore unavailable items such as Bind on Pickup crafted reagents
}

function storeLocal(storedItem, folder, filename) {
  const convertedItem = JSON.stringify(storedItem);
  fs.writeFile(
    `./${folder}/${filename}.json`,
    convertedItem,
    "utf8",
    function (err) {
      if (err) {
        console.log("Error while writing JSON object to file");
        return console.log(err);
      }
      // console.log(`JSON file saved to ${filename}.json`);
    }
  );
}

module.exports = {
  risky: calculateRisky,
  guaranteed: calculateGuaranteed,
};
