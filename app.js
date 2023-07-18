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
  return 999999999; // Hack to ignore Bind on Pickup crafted reagents by making them too expensive
}

// Iterate through all recipes and update their crafting costs
app.get("/update-crafting-costs", async (req, res) => {
  // Retrieve all recipes from database
  let allRecipes = await EngineeringRecipe.find().lean();

  // For each recipe
  for (let i = 0; i < allRecipes.length; i++) {
    let reagents = allRecipes[i].reagentList;
    let totalCost = 0;

    // For each reagent in the recipe, lookup the cost and add to total cost
    for (let j = 0; j < reagents.length; j++) {
      let reagent = reagents[j].reagentID;
      let numReagents = reagents[j].reagentQuantity;

      let price = priceLookup(reagent, ah_data); // Price of individual reagent
      price *= numReagents; // Individual price * quantity needed

      totalCost += price; // Running total cost of this crafted item
    }

    // Update the cost of the recipe in database
    const updatePrice = await engineeringRecipe.findOneAndUpdate(
      {
        recipeID: allRecipes[i].recipeID,
      },
      { craftingCost: totalCost }
    );
  }
  res.send("done");
});

// Should this be a post request? using get for convenience right now
app.get("/upload-engineering-recipes", (req, res) => {
  numRecipes = Object.keys(recipesObject).length;

  // Convert all recipes according to the schema and upload to database
  for (let i = 0; i < numRecipes; i++) {
    currentRecipe = recipesObject[i];

    if (!currentRecipe.hasOwnProperty("creates")) {
      continue;
    }

    let itemNameVar = currentRecipe.name;
    let recipeIDVar = currentRecipe.id;
    let craftedItemIDVar = currentRecipe.creates[0];
    let learnedAtVar = currentRecipe.learnedat;

    // Assign reagentListVar as an array of key-value pair objects, reagent: quantity
    let reagentListVar = [];
    for (let j = 0; j < currentRecipe.reagents.length; j++) {
      let reagentID = currentRecipe.reagents[j][0];
      let reagentQuantity = currentRecipe.reagents[j][1];

      reagentListVar.push({ reagentID, reagentQuantity });
    }
    // Assign difficultyColorsVar as an array of integers [Orange, Yellow, Green, Gray]
    let difficultyColorsVar = [];
    for (let j = 0; j < 4; j++) {
      let skillLevel = currentRecipe.colors[j];
      difficultyColorsVar.push(skillLevel);
    }

    let craftingCostVar = 0; // Placeholder cost of 0 for now
    let quantityCreatedVar = currentRecipe.creates[1]; // Need to work on this for uncertain amounts

    const engineeringRecipe = new EngineeringRecipe({
      itemName: itemNameVar,
      recipeID: recipeIDVar,
      craftedItemID: craftedItemIDVar,
      reagentList: reagentListVar,
      learnedAt: learnedAtVar,
      difficultyColors: difficultyColorsVar,
      craftingCost: craftingCostVar,
      quantityCreated: quantityCreatedVar,
    });
    engineeringRecipe.save();

    // await engineeringRecipe.save() ??
  }
  res.send("finished");
});

// Testing database retrieval
app.get("/retrieve-recipes", async (req, res) => {
  let test = await EngineeringRecipe.find().lean();
  // .then((result) => {
  //   return result;
  // });

  res.send(test);
});
