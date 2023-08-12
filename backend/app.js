const express = require("express");
const fetch = require("node-fetch-commonjs");
const fs = require("fs");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const EngineeringRecipe = require("./models/engineering.js");

const recipesObject = require("./recipe_jsons/engineer.json");
const iconsObject = require("./icons/icons.json");
const ah_data = require("./ah_data/benediction-ally.json");
const optimalPathData = require("./optimal_path/optimal_path.json");
const groupedPathData = require("./optimal_path/grouped_path.json");

// Express app
const app = express();

const mongoURL = process.env.MONGODB_CONNECT_STRING;
const tsmToken = process.env.TSM_BEARER_TOKEN;

// Connect to mongodb with mongoose
const dbURI = mongoURL;

const MAX_SKILL_LEVEL = 450;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000); // Only start listening for requests once the database has been retrieved
    console.log("mongoose connected to db");
  })
  .catch((err) => console.log(err));

// Get request to TSM api for realm (Benediction) auction house data
url = "https://pricing-api.tradeskillmaster.com/ah/347"; // need to make the realm ID a variable

async function fetchRealmData(url) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tsmToken}` },
  });
  let ah_object = await response.json();
  let ah_content = JSON.stringify(ah_object);

  realm_name = "benediction-ally";
  fs.writeFile(
    `./ah_data/${realm_name}.json`,
    ah_content,
    "utf8",
    function (err) {
      if (err) {
        console.log("Error while writing JSON object to file");
        return console.log(err);
      }
      console.log("JSON file saved to", `${realm_name}.json`);
    }
  );
}

app.use(cors({ origin: "http://localhost:5173" }));

// Grab the realm auction house data and store into file (allowed 100/24 hours)
app.get("/fetch-realm-data", async (req, res) => {
  fetchRealmData(url);
  res.send("Fetched realm data");
});

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

// Iterate through all recipes and update their crafting costs
app.get("/update-crafting-costs", async (req, res) => {
  // For each recipe(map)
  // For each reagent
  // function calculateCost()
  // If vendor item, get fixed cost, return
  // If purchasable, look up the AH cost
  // If craftable, function calculateCost()
  // function ifCraftable()
  // lookup item in allrecipes
  // for now, we can discount multi nested items (return a third option that bricks crafting as a choice)
  // Edge case handler for weird things like abomination stitching or w/e
  // Get min of the first 2/3 and return cost + purchase or craft
  // ItemID, totalcost, crafted [][][][] vs itemID, totalcost, bought
  // [reagentID, 25 copper, crafted, [[reagent1, 25 copper, crafted,[[rawmaterial1, 25c, bought], [rawmaterial2, 25c, bought]]], [reagent2, 25 copper, bought]
  // [reagentID, 25 copper, bought]

  // if crafting, we want to return
  // item we are crafting
  // total cost
  // each reagent
  // source(craft/buy) of each reagent

  // Retrieve all recipes from database
  const allRecipes = await EngineeringRecipe.find().lean();

  // Calculate the total cost and whether to craft or buy each reagent: return an object/array with this info
  // Attempting functional programming, need feedback
  const updatedRecipes = allRecipes.map((recipe) => {
    const currentReagents = recipe.reagentList;

    const reagentCosts = currentReagents.map((reagent) => {
      individualCost = priceLookup(reagent[0], ah_data);
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
  res.send("Recipe costs updated");
});

// No idea how to apply functional programming
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

app.get("/calculate-optimal-path", async (req, res) => {
  // Need to add goblin vs gnomish filter (or ignore entirely)
  let currentSkill = 1;

  let recipePath = [];
  let inventory = new Map();

  while (currentSkill < MAX_SKILL_LEVEL) {
    const craftableRecipes = await EngineeringRecipe.where("difficultyColors.0")
      .lte(currentSkill)
      .where("difficultyColors.1")
      .gt(currentSkill);

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
    currentSkill += 1;
  }
  console.log(recipePath[0]);

  // Sort recipes
  recipePath.sort((a, b) => {
    // Somewhat janky but I believe reagents always yellow out before crafted components
    //    - may have to manually double check
    return a.difficultyColors[1] - b.difficultyColors[1];
  });
  let storedPath = JSON.stringify(recipePath);

  res.send("Optimal path calculated");
  fs.writeFile(
    `./optimal_path/optimal_path.json`,
    storedPath,
    "utf8",
    function (err) {
      if (err) {
        console.log("Error while writing JSON object to file");
        return console.log(err);
      }
      console.log("JSON file saved to optimal_path.json");
    }
  );
});

// Temporary
app.get("/group-like-items", (req, res) => {
  const ungroupedItems = optimalPathData;
  const groupedItems = [];

  let duplicateCount = 1;
  let currentItem = ungroupedItems[0].craftedItemID;

  for (i = 1; i < ungroupedItems.length; i++) {
    // Count identical items
    if (ungroupedItems[i].craftedItemID == currentItem) {
      duplicateCount += 1;
      if (i == ungroupedItems.length - 1) {
        // Add the quantity as a property
        ungroupedItems[i - 1].quantityToCraft = duplicateCount;
        groupedItems.push(ungroupedItems[i - 1]);
      }
    }
    // Push item and quantity to craft *** will probably have to edit later for uncertainty
    else {
      ungroupedItems[i - 1].quantityToCraft = duplicateCount;
      groupedItems.push(ungroupedItems[i - 1]);
      duplicateCount = 1;
      currentItem = ungroupedItems[i].craftedItemID;
    }
  }

  let storedPath = JSON.stringify(groupedItems);

  fs.writeFile(
    `./optimal_path/grouped_path.json`,
    storedPath,
    "utf8",
    function (err) {
      if (err) {
        console.log("Error while writing JSON object to file");
        return console.log(err);
      }
      console.log("JSON file saved to optimal_path.json");
    }
  );
  res.send("Identical items grouped");
});

app.get("/fetch-optimal-path", (req, res) => {
  res.status(200).json(groupedPathData);
});

app.get("/upload-engineering-recipes", (req, res) => {
  console.log(iconsObject[4357]);
  // Filter out uncraftable items
  const filteredRecipes = recipesObject.filter(
    (recipe) => recipe.hasOwnProperty("creates") // need to update this - personal enchantments don't create but can be used for skillups
  );
  // Convert all recipes into mongoose model format
  const formattedRecipes = filteredRecipes.map(
    (recipe) =>
      new EngineeringRecipe({
        itemName: recipe.name,
        recipeID: recipe.id,
        craftedItemID: recipe.creates[0],
        reagentList: recipe.reagents,
        learnedAt: recipe.learnedat,
        difficultyColors: recipe.colors,
        craftingCost: 0, // Need to run update-crafting-costs afterwards
        quantityCreated: recipe.creates[1], // Part of the creates property, TODO: update for variable quantity
        icon: `https://wow.zamimg.com/images/wow/icons/large/${
          iconsObject[recipe.creates[0]].icon
        }.jpg`,
      })
  );
  // Save recipes to mongoDB atlas
  formattedRecipes.forEach((recipe) => recipe.save());

  res.send("Recipes uploaded");
});

// Testing database retrieval
app.get("/retrieve-recipes", async (req, res) => {
  let test = await EngineeringRecipe.find().lean();
  console.log(test.length);
  res.send(test);
});
