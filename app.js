const express = require("express");
const mongoose = require("mongoose");
const EngineerRecipe = require("./models/engineer.js");
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

async function testFunction(url) {
  marketValue = await fetchTest(url);
}
testFunction(url);

function convertRecipes(recipe) {
  // express Route to be called 1 time to populate the database
  // for loop
  // this function
  //
  // This function will convert the recipe to match the model/schema and return a json object
  // to send to the database
}
// let currentRecipe = recipesObject[0];

// let skillLevel = currentRecipe.colors[0];

// let color = "orange";
// let testarr = [];
// testarr.push({ [color]: skillLevel });
// console.log(currentRecipe);

app.get("/upload-engineer-recipes", (req, res) => {
  numRecipes = Object.keys(recipesObject).length;
  let counter = 0;
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
    for (let j = 0; i < currentRecipe.reagents.length; i++) {
      let reagentID = currentRecipe.reagents[j][0];
      let reagentQuantity = currentRecipe.reagents[j][1];

      reagentListVar.push({ reagentID, reagentQuantity });
    }
    // Assign difficultyColorsVar as an array of key-value pair objects, color: skillLevel
    let difficultyColorsVar = [];
    for (let j = 0; i < 4; i++) {
      let color;

      if (j == 0) {
        color = "orange";
      } else if (j == 1) {
        color = "yellow";
      } else if (j == 2) {
        color = "green";
      } else {
        color = "gray";
      }
      let skillLevel = currentRecipe.colors[j];

      difficultyColorsVar.push({ [color]: skillLevel });
    }

    let craftingCostVar = 0; // Placeholder cost of 0 for now
    let quantityCreatedVar = currentRecipe.creates[1]; // Need to work on this for uncertain amounts

    const engineerRecipe = new EngineerRecipe({
      itemName: itemNameVar,
      recipeID: recipeIDVar,
      craftedItemID: craftedItemIDVar,
      reagentList: reagentListVar,
      learnedAt: learnedAtVar,
      difficultyColors: difficultyColorsVar,
      craftingCost: craftingCostVar,
      quantityCreated: quantityCreatedVar,
    });
    counter += 1;
    engineerRecipe.save();
  }
  console.log(counter);
  res.send("finished");
});

// Sandbox mongoose testing routes
app.get("/add-engineer-recipe", (req, res) => {
  for (let i = 0; i < 3; i++) {
    // add function or code to set all the properties correctly in the loop

    const engineerRecipe = new EngineerRecipe({
      itemName: "Rough Blasting Powder",
      recipeID: i,
      craftedItemID: 4357,
      reagentList: [
        { reagentID: 2835, reagentCost: 25, quantity: 1 },
        // { reagentID: 999, reagentCost: 30, quantity: 2 },
      ],
      learnedAt: 1,
      difficultyColors: {
        orange: 1,
        yellow: 20,
        green: 30,
        gray: 40,
      },
      craftingCost: 25,
    });

    engineerRecipe.save();
    // .then((result) => {
    //   console.log(i);
    //   res.send(result);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }
  res.send("uploaded");
});

app.get("/retrieve-recipes", (req, res) => {
  EngineerRecipe.find().then((result) => {
    // Manipulate the object here

    res.send(result);
  });
});

// .find    .findById   .where

// // Listening for get requests
// app.get("/", (req, res) => {
//   //res.send("<p>home page</p>");
//   res.sendFile("./views/index.html", { root: __dirname });
// });

// app.get("/about", (req, res) => {
//   res.sendFile("./views/about.html", { root: __dirname });
// });

// // Redirects
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// // 404
// app.use((req, res) => {
//   res.status(404).sendFile("./views/404.html", { root: __dirname });
// });
