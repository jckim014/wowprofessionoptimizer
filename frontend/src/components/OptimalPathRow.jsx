const OptimalPathRow = ({ recipe, skillRange }) => {
  const start = skillRange[0];
  const end = skillRange[1];
  const quantity = end - start;
  // Add state to record total cost

  // Not sure where price conversion should ultimately go
  // Initialize gold/silver/copper coins
  const unconvertedCost = recipe.craftingCost;
  function convertPrice(total) {
    let gold = 0;
    let silver = 0;
    let copper = 0;

    // Calculate gold
    gold = Math.floor(total / 10000);
    let remainder = total % 10000;
    // Calculate silver
    silver = Math.floor(remainder / 100);
    remainder = remainder % 100;
    // Calculate copper
    copper = remainder;

    return { gold: gold, silver: silver, copper: copper };
  }

  let individualCost = convertPrice(unconvertedCost);
  let totalCost = convertPrice(unconvertedCost * quantity);

  // Eventually add gold/silver/copper coin icons - maybe this can be a local img resource
  return (
    <tr className="recipe">
      <td>
        <img src={`${recipe.icon}`}></img>
      </td>
      <td>{recipe.itemName}</td>
      {/* <td>{recipe.craftedItemID}</td> */}
      <td>
        Craft {quantity} of this item from {start} to {end}.
      </td>
      {/* <td>Available at: {recipe.difficultyColors[0]}</td> */}

      <td>
        Individual cost: {individualCost.gold.toLocaleString("en-us")} gold,{" "}
        {individualCost.silver.toLocaleString("en-us")} silver, and{" "}
        {individualCost.copper.toLocaleString("en-us")} copper.
        {/* Possibly render these as components to display conditionally */}
      </td>
      <td>
        Total cost: {totalCost.gold.toLocaleString("en-us")} gold,{" "}
        {totalCost.silver.toLocaleString("en-us")} silver, and{" "}
        {totalCost.copper.toLocaleString("en-us")} copper.
      </td>
    </tr>
  );
};

//   <div>
//   <div>Available at: {recipe.difficultyColors[0]}</div>
//   <div>{recipe.itemName}</div>
//   <div>{recipe.craftedItemID}</div>
//   <div>
//     <img src={`${recipe.icon}`}></img>
//   </div>
//   <div>
//     This item costs {gold} gold, {silver} silver, and {copper} copper.
//   </div>
// </div>

export default OptimalPathRow;
