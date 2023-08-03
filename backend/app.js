const express = require("express");
const fetch = require("node-fetch-commonjs");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const EngineeringRecipe = require("./models/engineering.js");

const recipesObject = require("./recipe_jsons/engineer.json");
const ah_data = require("./ah_data/benediction-ally.json");
const engineeringRecipe = require("./models/engineering.js");

// Express app
const app = express();

const mongoURL = process.env.MONGODB_CONNECT_STRING;
const tsmToken = process.env.TSM_BEARER_TOKEN;

// Connect to mongodb with mongoose
const dbURI = mongoURL;

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

// Grab the realm auction house data and store into file (allowed 100/24 hours)
app.get("/fetch-realm-data", async (req, res) => {
  fetchRealmData(url);
  res.send("Fetched realm data");
});

// Extremely basic for now - assumes buying all reagents and ignores unbuyable
// Need to expand on this
// Add logic for BOP items, vendor items, etc - will tie in with source I think (as an arg)
function priceLookup(reagentID, ah_data) {
  for (let i = 0; i < ah_data.length; i++) {
    if (ah_data[i].itemId == reagentID) {
      let price = ah_data[i].marketValue;
      return price;
    }
    // Maybe error handling would be good here?
  }
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

app.get("/calculate-optimal-path", async (req, res) => {
  // Need to add goblin vs gnomish filter (or ignore entirely)

  let currentSkill = 1;
  let skillFloor = 0;

  const craftableRecipes = await EngineeringRecipe.where("difficultyColors.0")
    .lte(currentSkill)
    .gte(skillFloor);

  console.log(craftableRecipes);
  res.send("placeholder");

  //Inventory
});

app.get("/upload-engineering-recipes", (req, res) => {
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
        craftingCost: 0, // Placeholder, can call price calculator function here?
        quantityCreated: recipe.creates[1], // Part of the creates property, TODO: update for variable quantity
      })
  );
  // Save recipes to mongoDB atlas
  formattedRecipes.forEach((recipe) => recipe.save());

  res.send("Recipes uploaded.");
});

// Testing database retrieval
app.get("/retrieve-recipes", async (req, res) => {
  let test = await EngineeringRecipe.find().lean();
  // .then((result) => {
  //   return result;
  // });
  console.log(test.length);
  res.send(test);
});
