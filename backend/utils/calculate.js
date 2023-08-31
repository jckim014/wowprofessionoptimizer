const fs = require("fs");

const total_data = require("../ah_data/total_data.json");

const allRecipes = require("../recipe_storage/stored_recipes.json");

const engineerIcons = require("../icons/engineer_icons.json");
const alchemyIcons = require("../icons/alchemy_icons.json");
const blacksmithingIcons = require("../icons/blacksmithing_icons.json");
const cookingIcons = require("../icons/cooking_icons.json");
const enchantingIcons = require("../icons/enchanting_icons.json");
const firstaidIcons = require("../icons/firstaid_icons.json");
const inscriptionIcons = require("../icons/inscription_icons.json");
const jewelcraftingIcons = require("../icons/jewelcrafting_icons.json");
const leatherworkingIcons = require("../icons/leatherworking_icons.json");
const tailoringIcons = require("../icons/tailoring_icons.json");

const MAX_SKILL_LEVEL = 450;
const ACCEPTABLE_RISK = 90; // this could even be a user input variable

function calculateGuaranteed(currentSkill, profession, server, faction) {
  let ah_data = total_data[server + " " + faction];

  let processedRecipes = allRecipes[profession];
  // Selectively choose the right icons object
  let iconsObject;
  switch (profession) {
    case "Engineering":
      iconsObject = engineerIcons;
      break;
    case "Alchemy":
      iconsObject = alchemyIcons;
      break;
    case "Blacksmithing":
      iconsObject = blacksmithingIcons;
      break;
    case "Cooking":
      iconsObject = cookingIcons;
      break;
    case "Enchanting":
      iconsObject = enchantingIcons;
      break;
    case "Inscription":
      iconsObject = inscriptionIcons;
      break;
    case "Jewelcrafting":
      iconsObject = jewelcraftingIcons;
      break;
    case "Leatherworking":
      iconsObject = leatherworkingIcons;
      break;
    case "Tailoring":
      iconsObject = tailoringIcons;
      break;
  }

  let recipePath = [];
  let inventory = new Map();

  while (currentSkill < MAX_SKILL_LEVEL) {
    const craftableRecipes = processedRecipes.filter((recipe) => {
      return (
        recipe.difficultyColors[0] <= currentSkill &&
        recipe.difficultyColors[1] > currentSkill
      );
    });

    // Filter out unusual recipes (no orange skill)
    const filteredRecipes = craftableRecipes.filter((recipe) => {
      return recipe.difficultyColors.length > 3;
      // return recipe.difficultyColors[1] - recipe.difficultyColors[0] < 50;
    });
    // const filteredRecipes = craftableRecipes;

    // Find cheapest recipe
    // Manual fix for Alchemy 415-425
    if (profession == "Alchemy") {
      if (currentSkill >= 415 && currentSkill < 425) {
        let specialRecipe = {
          _id: "64ec44d2ab9a5c0f376f4afd",
          itemName: "Runic Mana Potion",
          recipeID: 53837,
          craftedItemID: 33448,
          reagentList: [
            [36905, 2],
            [36901, 1],
            [18256, 1],
          ],
          learnedAt: 410,
          difficultyColors: [410, 415, 422, 430],
          craftingCost: 65255,
          quantityCreated: 1,
          icon: "https://wow.zamimg.com/images/wow/icons/large/inv_alchemy_elixir_02.jpg",
          link: "https://wowhead.com/wotlk/spell=53837/Runic-Mana-Potion",
          createdAt: "2023-08-28T06:55:14.988Z",
          updatedAt: "2023-08-28T06:55:45.939Z",
          __v: 0,
        };
        // Add special crafted to inventory
        const specialCrafted = specialRecipe.craftedItemID;
        const specialQuantity = specialRecipe.quantityCreated;
        inventory.set(
          specialCrafted,
          inventory.get(specialCrafted) + specialQuantity || 1
        );
        // Record special recipe
        recipePath.push(specialRecipe); // Can include other information as an array of arrays
        currentSkill = currentSkill + 1;
        continue;
      }
    }
    // Manual fix for blacksmithing 435-440
    if (profession == "Blacksmithing") {
      if (currentSkill >= 435 && currentSkill < 440) {
        let specialRecipe = {
          _id: "64ed87464a82465bdd955a40",
          itemName: "Titanium Skeleton Key",
          recipeID: 59406,
          craftedItemID: 43853,
          reagentList: [
            [36913, 4],
            [41163, 1],
          ],
          learnedAt: 430,
          difficultyColors: [430, 435, 440, 445],
          craftingCost: 179716,
          quantityCreated: 20,
          icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_key_11.jpg",
          link: "https://wowhead.com/wotlk/spell=59406/Titanium-Skeleton-Key",
          createdAt: "2023-08-29T05:51:03.016Z",
          updatedAt: "2023-08-29T05:57:04.852Z",
          __v: 0,
        };
        // Add special crafted to inventory
        const specialCrafted = specialRecipe.craftedItemID;
        const specialQuantity = specialRecipe.quantityCreated;
        inventory.set(
          specialCrafted,
          inventory.get(specialCrafted) + specialQuantity || 1
        );
        // Record special recipe
        recipePath.push(specialRecipe); // Can include other information as an array of arrays
        currentSkill = currentSkill + 1;
        continue;
      }
    }
    // Manual fix for cooking 375-400 and 435-440
    if (profession == "Cooking") {
      if (currentSkill >= 375 && currentSkill < 400) {
        let specialRecipe = {
          _id: "64ed926a532807559ca53a79",
          itemName: "Great Feast",
          recipeID: 45554,
          craftedItemID: 34753,
          reagentList: [
            [34736, 1],
            [43009, 1],
            [43010, 1],
            [43013, 2],
          ],
          learnedAt: 375,
          difficultyColors: [375, 375, 400, 425],
          craftingCost: 13873,
          quantityCreated: 1,
          icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_pet_boar.jpg",
          link: "https://wowhead.com/wotlk/spell=45554/Great-Feast",
          createdAt: "2023-08-29T06:38:34.577Z",
          updatedAt: "2023-08-29T06:38:37.997Z",
          __v: 0,
        };
        // Add special crafted to inventory
        const specialCrafted = specialRecipe.craftedItemID;
        const specialQuantity = specialRecipe.quantityCreated;
        inventory.set(
          specialCrafted,
          inventory.get(specialCrafted) + specialQuantity || 1
        );
        // Record special recipe
        recipePath.push(specialRecipe); // Can include other information as an array of arrays
        currentSkill = currentSkill + 1;
        continue;
      }
      if (currentSkill >= 435 && currentSkill < 450) {
        let specialRecipe = {
          _id: "64ed910d0f136da7bfd4c5d2",
          itemName: "Gigantic Feast",
          recipeID: 58527,
          craftedItemID: 43478,
          reagentList: [
            [41800, 2],
            [34736, 2],
            [41803, 2],
            [43007, 1],
          ],
          learnedAt: 425,
          difficultyColors: [425, 435, 455, 475],
          craftingCost: 41607,
          quantityCreated: 1,
          icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_pet_boar.jpg",
          link: "https://wowhead.com/wotlk/spell=58527/Gigantic-Feast",
          createdAt: "2023-08-29T06:32:45.325Z",
          updatedAt: "2023-08-29T06:32:59.044Z",
          __v: 0,
        };
        // Add special crafted to inventory
        const specialCrafted = specialRecipe.craftedItemID;
        const specialQuantity = specialRecipe.quantityCreated;
        inventory.set(
          specialCrafted,
          inventory.get(specialCrafted) + specialQuantity || 1
        );
        // Record special recipe
        recipePath.push(specialRecipe); // Can include other information as an array of arrays
        currentSkill = currentSkill + 1;
        continue;
      }
    }
    const [cheapestRecipe, quantityCreated, usedInventory] = getOptimalRecipe(
      filteredRecipes,
      inventory,
      ah_data
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
    iconData: iconsObject,
  };
  return responseObject;
}

function calculateEnchanting(currentSkill, server, faction) {
  let ah_data = total_data[server + " " + faction];

  let processedRecipes = allRecipes["Enchanting"];
  let iconsObject = enchantingIcons;

  let recipePath = [];

  while (currentSkill < MAX_SKILL_LEVEL) {
    const craftableRecipes = processedRecipes.filter((recipe) => {
      return (
        recipe.difficultyColors[0] <= currentSkill &&
        recipe.difficultyColors[1] > currentSkill
      );
    });

    // Filter out unusual recipes (no orange skill)
    const filteredRecipes = craftableRecipes.filter((recipe) => {
      return recipe.difficultyColors.length > 3;
      // return recipe.difficultyColors[1] - recipe.difficultyColors[0] < 50;
    });

    // Find cheapest recipe
    const [cheapestRecipe] = getOptimalEnchantingRecipe(
      filteredRecipes,
      ah_data
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
    let currentID = recipePath[i].recipeID;
    if (seenItems.has(currentID)) {
      continue;
    }
    let count = 0;
    for (let j = i; j < recipePath.length; j++) {
      if (currentID == recipePath[j].recipeID) {
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
    iconData: iconsObject,
  };
  return responseObject;
}

function calculateFirstaid(currentSkill, server, faction) {
  let ah_data = total_data[server + " " + faction];

  let processedRecipes = allRecipes["First Aid"];
  let iconsObject = firstaidIcons;

  let recipePath = [];
  let inventory = new Map();

  const craftableRecipes = processedRecipes;

  while (currentSkill < MAX_SKILL_LEVEL) {
    if (currentSkill < 40) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720d4",
        itemName: "Linen Bandage",
        recipeID: 3275,
        reagentList: [[2589, 1]],
        learnedAt: 1,
        difficultyColors: [1, 30, 45, 60],
        craftingCost: 591,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_15.jpg",
        link: "https://wowhead.com/wotlk/spell=3275/Linen-Bandage",
        createdAt: "2023-08-30T05:28:44.868Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 40 && currentSkill < 80) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720d5",
        itemName: "Heavy Linen Bandage",
        recipeID: 3276,
        reagentList: [[2589, 2]],
        learnedAt: 40,
        difficultyColors: [40, 50, 75, 100],
        craftingCost: 1182,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_18.jpg",
        link: "https://wowhead.com/wotlk/spell=3276/Heavy-Linen-Bandage",
        createdAt: "2023-08-30T05:28:44.868Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 80 && currentSkill < 115) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720d6",
        itemName: "Wool Bandage",
        recipeID: 3277,
        reagentList: [[2592, 1]],
        learnedAt: 80,
        difficultyColors: [80, 80, 115, 150],
        craftingCost: 4099,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_14.jpg",
        link: "https://wowhead.com/wotlk/spell=3277/Wool-Bandage",
        createdAt: "2023-08-30T05:28:44.868Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 115 && currentSkill < 150) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720d7",
        itemName: "Heavy Wool Bandage",
        recipeID: 3278,
        reagentList: [[2592, 2]],
        learnedAt: 115,
        difficultyColors: [115, 115, 150, 185],
        craftingCost: 8198,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_17.jpg",
        link: "https://wowhead.com/wotlk/spell=3278/Heavy-Wool-Bandage",
        createdAt: "2023-08-30T05:28:44.868Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 150 && currentSkill < 180) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720d8",
        itemName: "Silk Bandage",
        recipeID: 7928,
        reagentList: [[4306, 1]],
        learnedAt: 150,
        difficultyColors: [150, 150, 180, 210],
        craftingCost: 2026,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_01.jpg",
        link: "https://wowhead.com/wotlk/spell=7928/Silk-Bandage",
        createdAt: "2023-08-30T05:28:44.868Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 180 && currentSkill < 210) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720d9",
        itemName: "Heavy Silk Bandage",
        recipeID: 7929,
        reagentList: [[4306, 2]],
        learnedAt: 180,
        difficultyColors: [180, 180, 210, 240],
        craftingCost: 4052,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_02.jpg",
        link: "https://wowhead.com/wotlk/spell=7929/Heavy-Silk-Bandage",
        createdAt: "2023-08-30T05:28:44.868Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 210 && currentSkill < 240) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720dc",
        itemName: "Mageweave Bandage",
        recipeID: 10840,
        reagentList: [[4338, 1]],
        learnedAt: 210,
        difficultyColors: [210, 210, 240, 270],
        craftingCost: 4944,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_19.jpg",
        link: "https://wowhead.com/wotlk/spell=10840/Mageweave-Bandage",
        createdAt: "2023-08-30T05:28:44.868Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 240 && currentSkill < 260) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720dd",
        itemName: "Heavy Mageweave Bandage",
        recipeID: 10841,
        reagentList: [[4338, 2]],
        learnedAt: 240,
        difficultyColors: [240, 240, 270, 300],
        craftingCost: 9888,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_20.jpg",
        link: "https://wowhead.com/wotlk/spell=10841/Heavy-Mageweave-Bandage",
        createdAt: "2023-08-30T05:28:44.869Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 260 && currentSkill < 290) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720de",
        itemName: "Runecloth Bandage",
        recipeID: 18629,
        reagentList: [[14047, 1]],
        learnedAt: 260,
        difficultyColors: [260, 260, 290, 320],
        craftingCost: 1999,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_11.jpg",
        link: "https://wowhead.com/wotlk/spell=18629/Runecloth-Bandage",
        createdAt: "2023-08-30T05:28:44.869Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 290 && currentSkill < 300) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720df",
        itemName: "Heavy Runecloth Bandage",
        recipeID: 18630,
        reagentList: [[14047, 2]],
        learnedAt: 290,
        difficultyColors: [290, 290, 320, 350],
        craftingCost: 3998,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_12.jpg",
        link: "https://wowhead.com/wotlk/spell=18630/Heavy-Runecloth-Bandage",
        createdAt: "2023-08-30T05:28:44.869Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 300 && currentSkill < 330) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720e1",
        itemName: "Netherweave Bandage",
        recipeID: 27032,
        reagentList: [[21877, 1]],
        learnedAt: 300,
        difficultyColors: [300, 330, 347, 365],
        craftingCost: 1460,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_netherweave.jpg",
        link: "https://wowhead.com/wotlk/spell=27032/Netherweave-Bandage",
        createdAt: "2023-08-30T05:28:44.869Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 330 && currentSkill < 350) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720e2",
        itemName: "Heavy Netherweave Bandage",
        recipeID: 27033,
        reagentList: [[21877, 2]],
        learnedAt: 330,
        difficultyColors: [330, 360, 367, 375],
        craftingCost: 2920,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_netherweave_heavy.jpg",
        link: "https://wowhead.com/wotlk/spell=27033/Heavy-Netherweave-Bandage",
        createdAt: "2023-08-30T05:28:44.869Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 350 && currentSkill < 400) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720e3",
        itemName: "Frostweave Bandage",
        recipeID: 45545,
        reagentList: [[33470, 1]],
        learnedAt: 350,
        difficultyColors: [350, 375, 392, 410],
        craftingCost: 4397,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_frostweave.jpg",
        link: "https://wowhead.com/wotlk/spell=45545/Frostweave-Bandage",
        createdAt: "2023-08-30T05:28:44.869Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
    if (currentSkill >= 400 && currentSkill < 450) {
      let specialRecipe = {
        _id: "64eed38cdaad6952225720e4",
        itemName: "Heavy Frostweave Bandage",
        recipeID: 45546,
        reagentList: [[33470, 2]],
        learnedAt: 400,
        difficultyColors: [400, 450, 455, 470],
        craftingCost: 8794,
        icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_bandage_frostweave_heavy.jpg",
        link: "https://wowhead.com/wotlk/spell=45546/Heavy-Frostweave-Bandage",
        createdAt: "2023-08-30T05:28:44.869Z",
        updatedAt: "2023-08-30T05:28:47.659Z",
        __v: 0,
      };
      // Add special crafted to inventory
      const specialCrafted = specialRecipe.craftedItemID;
      const specialQuantity = specialRecipe.quantityCreated;
      inventory.set(
        specialCrafted,
        inventory.get(specialCrafted) + specialQuantity || 1
      );
      // Record special recipe
      recipePath.push(specialRecipe); // Can include other information as an array of arrays
      currentSkill = currentSkill + 1;
      continue;
    }
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
    let currentID = recipePath[i].recipeID;
    if (seenItems.has(currentID)) {
      continue;
    }
    let count = 0;
    for (let j = i; j < recipePath.length; j++) {
      if (currentID == recipePath[j].recipeID) {
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
    iconData: iconsObject,
  };
  return responseObject;
}
// For each skill point, just calculate the cheapest

// For each skill point, find a risk adjusted cost

// Individual cost/chance of success = expected cost

// Can use the guarantee point as a ceiling

// n = ceiling: ln(1-c) / ln(1 - p)  n = number of attempts, c = confidence, p = probability of an individual attempt

function getOptimalRecipe(recipes, inventory, ah_data) {
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

  recipeObject.cost = minCost;

  const quantityCreated = recipes[minIndex].quantityCreated;

  return [recipeObject, quantityCreated, usedInventory];
}

function getOptimalEnchantingRecipe(recipes, ah_data) {
  minCost = Infinity;
  minIndex = 0;

  // Find the cheapest recipe
  for (let i = 0; i < recipes.length; i++) {
    let currentCost = recipes[i].craftingCost;

    // Update the current cheapest recipe
    // Add logic to check which recipes are less negative (more negative means using more expensive inventory)
    if (currentCost < minCost) {
      minCost = currentCost;
      minIndex = i;
    }
  }

  const recipeObject = recipes[minIndex];
  recipeObject.cost = minCost;

  return [recipeObject];
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
  guaranteed: calculateGuaranteed,
  enchanting: calculateEnchanting,
  firstaid: calculateFirstaid,
  priceLookup: priceLookup,
  storeLocal: storeLocal,
};
