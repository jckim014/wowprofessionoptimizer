const express = require("express");
const fetch = require("node-fetch-commonjs");
const fs = require("fs");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const EngineeringRecipe = require("./models/engineering.js");
const AlchemyRecipe = require("./models/alchemy.js");

// Moving, may delete
// const recipesObject = require("./recipe_jsons/engineer.json");

// Moving, may delete
// const iconsObject = require("./icons/icons.json");
const ah_data = require("./ah_data/benediction-ally.json");

const total_ah_data = require("./ah_data/total_data.json");

// Moving, may delete
// const optimalPathData = require("./optimal_path/optimal_path.json");
// const groupedPathData = require("./optimal_path/grouped_path.json");
// const shoppingListData = require("./optimal_path/shopping_list.json");

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
  updateCost.alchemy(price_data);

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

  // Call guaranteed path
  let responseObject = calculate.guaranteed(currentSkill, profession);
  // Call risky path
  if (data.riskTolerance) {
    console.log("Guaranteed!");
  }

  res.status(200).json(responseObject);
});

app.get("/upload-recipes", (req, res) => {
  // Be very careful with these!! Will override existing recipes
  // upload.engineering();
  upload.alchemy();

  res.send("Recipes uploaded");
});

// Retrieve and store all recipes
app.get("/retrieve-recipes", async (req, res) => {
  let storedRecipes = {};

  let engineerRecipes = await EngineeringRecipe.find().lean();
  // console.log("Engineering(275): ", engineerRecipes.length);
  let alchemyRecipes = await AlchemyRecipe.find().lean();
  // console.log("Alchemy(201): ", alchemyRecipes.length);

  storedRecipes["Engineering"] = engineerRecipes;
  storedRecipes["Alchemy"] = alchemyRecipes;

  calculate.storeLocal(storedRecipes, "recipe_storage", "stored_recipes");

  res.send("Recipes stored");
});
