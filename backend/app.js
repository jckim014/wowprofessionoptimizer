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
const shoppingListData = require("./optimal_path/shopping_list.json");

const calculate = require("./utils/calculate.js");

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

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Grab the realm auction house data and store into file (allowed 100/24 hours)
app.get("/fetch-realm-data", async (req, res) => {
  fetchRealmData(url);
  res.send("Fetched realm data");
});

// Iterate through all recipes and update their crafting costs
app.get("/update-crafting-costs", async (req, res) => {
  // Retrieve all recipes from database
  const allRecipes = await EngineeringRecipe.find().lean();

  // Calculate the total cost and whether to craft or buy each reagent: return an object/array with this info
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

app.post("/calculate-optimal-path", async (req, res) => {
  // const data = {
  //   profession: professionState,
  //   server: serverState,
  //   faction: factionState,
  //   startingLevel: startingLevelState,
  //   riskTolerance: riskToleranceState,
  // };

  // Need to add goblin vs gnomish filter (or ignore entirely)
  let data = req.body;
  console.log(data);

  let currentSkill = parseInt(data.startingLevel);

  // Call guaranteed path
  let responseObject = calculate.guaranteed(currentSkill);
  // Call risky path

  res.status(200).json(responseObject);
});

app.get("/upload-engineering-recipes", (req, res) => {
  // Filter out uncraftable items
  const filteredRecipes = recipesObject.filter(
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
        iconsObject[recipe.creates[0]].icon
      }.jpg`,
      link: `https://wowhead.com/wotlk/spell=${recipe.id}/${convertedString}`,
    });
  });
  // Save recipes to mongoDB atlas
  formattedRecipes.forEach((recipe) => recipe.save());

  res.send("Recipes uploaded");
});

// Retrieve and store all recipes
app.get("/retrieve-recipes", async (req, res) => {
  let allRecipes = await EngineeringRecipe.find().lean();
  // Should be 275
  console.log(allRecipes.length);

  const storedRecipes = JSON.stringify(allRecipes);
  storeLocal(storedRecipes, "recipe_storage", "stored_recipes");

  res.send(allRecipes);
});

// Deprecated
app.get("/fetch-optimal-path", (req, res) => {
  let responseObject = {
    optimalPathData: optimalPathData,
    shoppingListData: shoppingListData,
  };
  res.status(200).json(responseObject);
});
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

  // const storedPath = JSON.stringify(groupedItems);

  fs.writeFile(
    `./optimal_path/grouped_path.json`,
    storedPath,
    "utf8",
    function (err) {
      if (err) {
        console.log("Error while writing JSON object to file");
        return console.log(err);
      }
      // console.log("JSON file saved to grouped_path.json");
    }
  );
  res.send("Identical items grouped and reagents updated");
});

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
