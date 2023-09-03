const express = require("express");
const fetch = require("node-fetch-commonjs");
const fs = require("fs");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const test_data = require("./ah_data/benediction-ally.json");

const total_ah_data = require("./ah_data/total_data.json");
const realmList1 = require("./ah_data/realmlist1.json");
const realmList2 = require("./ah_data/realmlist2.json");
const realmList3 = require("./ah_data/realmlist3.json");
const realmList4 = require("./ah_data/realmlist4.json");

const calculate = require("./utils/calculate.js");
const upload = require("./utils/upload_recipes.js");
const updateCost = require("./utils/update_cost.js");

const mongoose = require("mongoose");

const EngineeringRecipe = require("./models/engineering.js");
const AlchemyRecipe = require("./models/alchemy.js");
const BlacksmithingRecipe = require("./models/blacksmithing.js");
const CookingRecipe = require("./models/cooking.js");
const EnchantingRecipe = require("./models/enchanting.js");
const FirstaidRecipe = require("./models/firstaid.js");
const InscriptionRecipe = require("./models/inscription.js");
const JewelcraftingRecipe = require("./models/jewelcrafting.js");
const LeatherworkingRecipe = require("./models/leatherworking.js");
const TailoringRecipe = require("./models/tailoring.js");

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

async function fetchRealmData(url, realm, count) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tsmToken}` },
  });
  console.log("Fetch complete");

  let ah_object = await response.json();

  let totalPriceData = total_ah_data;
  totalPriceData[realm] = ah_object;
  calculate.storeLocal(totalPriceData, "ah_data", "total_data");
  console.log(`Retrieved ${realm}`, count, response.status);
}

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Fetch realm auction house data and store (allowed 100/24 hours)
app.get("/fetch-realm-data", async (req, res) => {
  // let count = 1;
  // let realm = "Auberdine Horde";
  // let url = `https://pricing-api.tradeskillmaster.com/ah/364`;
  // fetchRealmData(url, realm, count);
  // Disable code for safety when not using
  // let count = 1;

  // let realmList = realmList4; // Change 1/2/3/4

  // for (realm in realmList) {
  //   let realmID = realmList[realm];
  //   let url = `https://pricing-api.tradeskillmaster.com/ah/${realmID}`;
  //   fetchRealmData(url, realm, count);
  //   setTimeout(() => {}, 30000);
  //   console.log(count);
  //   count += 1;
  // }

  console.log("Fetching/Disabled");
  res.send(`Fetching realm data`);
});

// Iterate through all recipes and update their crafting costs (only for setup)
app.get("/update-crafting-costs", async (req, res) => {
  // let price_data = total_ah_data["Benediction Alliance"];
  // // updateCost.engineering(price_data);
  // // updateCost.alchemy(price_data);
  // // updateCost.blacksmithing(price_data);
  // // updateCost.updateCost(price_data, "Cooking");
  // // updateCost.updateCost(price_data, "Enchanting");
  // // updateCost.updateCost(price_data, "First Aid");
  // // updateCost.updateCost(price_data, "Inscription");
  // // updateCost.updateCost(price_data, "Jewelcrafting");
  // // updateCost.updateCost(price_data, "Leatherworking");
  // updateCost.updateCost(price_data, "Engineering");

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

  let deadRealms = [
    "Atiesh Horde",
    "Benediction Horde",
    "Bloodsail Buccaneers Horde",
    "Earthshaker Horde",
    "Everlook Horde",
    "Gehennas Alliance",
    "Golemagg Alliance",
    "Faerlina Alliance",
    "Firemaw Horde",
    "Lakeshire Horde",
    "Mankrik Alliance",
    "Mograine Alliance",
    "Pagle Horde",
    "Pyrewood Village Horde",
    "Remulos Horde",
    "Venoxis Alliance",
    "Westfall Horde",
    "Whitemane Alliance",
  ];

  let profession = data.profession;
  let currentSkill = parseInt(data.startingLevel);
  let server = data.server;
  let faction = data.faction;

  let realmSlug = server + " " + faction;
  let responseObject;

  if (deadRealms.includes(realmSlug)) {
    responseObject = { deadRealm: true };
  } else {
    // Update prices to the correct server
    let price_data = total_ah_data[server + " " + faction];
    updateCost.updateCost(price_data, profession);

    // Calculate optimal path

    if (profession == "Enchanting") {
      responseObject = calculate.enchanting(currentSkill, server, faction);
    } else if (profession == "First Aid") {
      responseObject = calculate.firstaid(currentSkill, server, faction);
    } else {
      responseObject = calculate.guaranteed(
        currentSkill,
        profession,
        server,
        faction
      );
    }
  }

  res.status(200).json(responseObject);
});

app.get("/upload-recipes", (req, res) => {
  // Be very careful with these!! Will override existing recipes
  upload.engineering();
  // upload.alchemy();
  // upload.blacksmithing();
  // upload.cooking();
  // upload.enchanting();
  // upload.firstaid();
  // upload.inscription();
  // upload.jewelcrafting();
  // upload.leatherworking();
  // upload.tailoring();

  res.send("Recipes uploaded");
});

// Retrieve and store all recipes
app.get("/retrieve-recipes", async (req, res) => {
  let storedRecipes = {};

  let engineerRecipes = await EngineeringRecipe.find().lean();
  console.log("Engineering(272): ", engineerRecipes.length);
  let alchemyRecipes = await AlchemyRecipe.find().lean();
  console.log("Alchemy(201): ", alchemyRecipes.length);
  let blacksmithingRecipes = await BlacksmithingRecipe.find().lean();
  console.log("Blacksmithing(469): ", blacksmithingRecipes.length);
  let cookingRecipes = await CookingRecipe.find().lean();
  console.log("Cooking(154): ", cookingRecipes.length);
  let enchantingRecipes = await EnchantingRecipe.find().lean();
  console.log("Enchanting(286): ", enchantingRecipes.length);
  let firstaidRecipes = await FirstaidRecipe.find().lean();
  console.log("First Aid(17): ", firstaidRecipes.length);
  let inscriptionRecipes = await InscriptionRecipe.find().lean();
  console.log("Inscription(69): ", inscriptionRecipes.length);
  let jewelcraftingRecipes = await JewelcraftingRecipe.find().lean();
  console.log("Jewelcrafting(518): ", jewelcraftingRecipes.length);
  let leatherworkingRecipes = await LeatherworkingRecipe.find().lean();
  console.log("Leatherworking(530): ", leatherworkingRecipes.length);
  let tailoringRecipes = await TailoringRecipe.find().lean();
  console.log("Tailoring(424): ", tailoringRecipes.length);

  storedRecipes["Engineering"] = engineerRecipes;
  storedRecipes["Alchemy"] = alchemyRecipes;
  storedRecipes["Blacksmithing"] = blacksmithingRecipes;
  storedRecipes["Cooking"] = cookingRecipes;
  storedRecipes["Enchanting"] = enchantingRecipes;
  storedRecipes["First Aid"] = firstaidRecipes;
  storedRecipes["Inscription"] = inscriptionRecipes;
  storedRecipes["Jewelcrafting"] = jewelcraftingRecipes;
  storedRecipes["Leatherworking"] = leatherworkingRecipes;
  storedRecipes["Tailoring"] = tailoringRecipes;

  calculate.storeLocal(storedRecipes, "recipe_storage", "stored_recipes");

  res.send("Recipes stored");
});
