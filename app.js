const express = require("express");
const mongoose = require("mongoose");
const EngineeringRecipe = require("./models/engineering.js");
const fetch = require("node-fetch-commonjs");
const recipesObject = require("./recipe_jsons/engineer.json");

const dotenv = require("dotenv");
dotenv.config();
const mongoURL = process.env.MONGODB_CONNECT_STRING;
// Express app
const app = express();

// Connect to mongodb with mongoose
const dbURI = mongoURL;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000); // Only start listening for requests once the database has been retrieved
    console.log("mongoose connected to db");
  })
  .catch((err) => console.log(err));

// Testing Fetch: grabbing price data from nexushub
url =
  "https://api.nexushub.co/wow-classic/v1/items/benediction-alliance/2835/prices";

async function fetchTest(url) {
  const response = await fetch(url);
  let object = await response.json();
  marketValue = object.data[0].marketValue;
  return marketValue;
}

// Testing nexushub price data
url2 = "https://api.nexushub.co/wow-classic/v1/items/benediction-alliance";

async function fetchTest2(url2) {
  const response = await fetch(url2);
  let object = await response.json();
  itemID = object.data[0].itemId;
  previous = object.data[0];
  console.log(itemID);
  console.log(previous);
}
// fetchTest2(url2);

// Take a recipe
// Grab reagent price data
// Calculate crafting cost
// Update database

// Iterate through all recipes and update their crafting costs
app.get("/update-crafting-costs", (req, res) => {
  console.log(test);
  EngineeringRecipe.find()
    .lean()
    .then((result) => {
      // result contains all the recipes
      // loop through all recipes

      // calculate total cost
      // push the update
      numRecipes = result.length;

      for (let i = 0; i < numRecipes; i++) {
        // get the reagents
        // look up the cost of each reagent
        // Maintain database of reagent costs
      }
      res.send("finished");
      //
    });
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
  }
  res.send("finished");
});

// Testing database retrieval
app.get("/retrieve-recipes", async (req, res) => {
  let test = await EngineeringRecipe.find()
    .lean()
    .then((result) => {
      return result;
    });
  console.log("reagent list: ", test[0].reagentList);
  console.log("reagentID: ", test[0].reagentList[0].reagentID);
  console.log("reagentquantity", test[0].reagentList[0].reagentQuantity);
  res.send(test);
});
