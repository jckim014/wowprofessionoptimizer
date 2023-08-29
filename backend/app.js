const express = require("express");
const fetch = require("node-fetch-commonjs");
const fs = require("fs");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const EngineeringRecipe = require("./models/engineering.js");
const AlchemyRecipe = require("./models/alchemy.js");
const BlacksmithingRecipe = require("./models/blacksmithing.js");
const CookingRecipe = require("./models/cooking.js");
const EnchantingRecipe = require("./models/enchanting.js");

const ah_data = require("./ah_data/benediction-ally.json");

const total_ah_data = require("./ah_data/total_data.json");

const calculate = require("./utils/calculate.js");
const upload = require("./utils/upload_recipes.js");
const updateCost = require("./utils/update_cost.js");

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

async function fetchRealmData(url) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tsmToken}` },
  });

  console.log(tsmToken);
  let ah_object = await response.json();

  realm_name = "benediction-ally";
  calculate.storeLocal(ah_object, "ah_data", `${realm_name}`);
}

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/testing", async (req, res) => {
  let totalPriceData = total_ah_data;
  let server = "Benediction";
  let faction = "Horde";
  totalPriceData[server + faction] = ah_data;
  calculate.storeLocal(totalPriceData, "ah_data", "total_data");
  res.send("tested");
});

// Grab the realm auction house data and store into file (allowed 100/24 hours)
app.get("/fetch-realm-data", async (req, res) => {
  url = "https://pricing-api.tradeskillmaster.com/ah/347";
  fetchRealmData(url);

  console.log("fetched");
  res.send("Fetched realm data");
});

// Iterate through all recipes and update their crafting costs
app.get("/update-crafting-costs", async (req, res) => {
  let price_data = total_ah_data["BenedictionAlliance"];
  // updateCost.engineering(price_data);
  // updateCost.alchemy(price_data);
  // updateCost.blacksmithing(price_data);
  // updateCost.updateCost(price_data, "Cooking");
  updateCost.updateCost(price_data, "Enchanting");

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
  let profession = data.profession;
  let currentSkill = parseInt(data.startingLevel);

  let responseObject;
  if (profession == "Enchanting") {
    responseObject = calculate.enchanting(currentSkill);
  } else {
    responseObject = calculate.guaranteed(currentSkill, profession);
  }

  res.status(200).json(responseObject);
});

app.get("/upload-recipes", (req, res) => {
  // Be very careful with these!! Will override existing recipes
  // upload.engineering();
  // upload.alchemy();
  // upload.blacksmithing();
  // upload.cooking();
  upload.enchanting();

  res.send("Recipes uploaded");
});

// Retrieve and store all recipes
app.get("/retrieve-recipes", async (req, res) => {
  let storedRecipes = {};

  let engineerRecipes = await EngineeringRecipe.find().lean();
  console.log("Engineering(275): ", engineerRecipes.length);
  let alchemyRecipes = await AlchemyRecipe.find().lean();
  console.log("Alchemy(201): ", alchemyRecipes.length);
  let blacksmithingRecipes = await BlacksmithingRecipe.find().lean();
  console.log("Blacksmithing(469): ", BlacksmithingRecipe.length);
  let cookingRecipes = await CookingRecipe.find().lean();
  console.log("Cooking(154): ", cookingRecipes.length);
  let enchantingRecipes = await EnchantingRecipe.find().lean();
  console.log("Enchanting(286): ", enchantingRecipes.length);

  storedRecipes["Engineering"] = engineerRecipes;
  storedRecipes["Alchemy"] = alchemyRecipes;
  storedRecipes["Blacksmithing"] = blacksmithingRecipes;
  storedRecipes["Cooking"] = cookingRecipes;
  storedRecipes["Enchanting"] = enchantingRecipes;

  calculate.storeLocal(storedRecipes, "recipe_storage", "stored_recipes");

  res.send("Recipes stored");
});
