import useConvert from "../customhooks/useConvert";

const OptimalPathRow = ({ recipe, skillRange }) => {
  const start = skillRange[0];
  const end = skillRange[1];
  const quantity = end - start;

  // Image sources for coins - somewhat unreadable but good flavor
  // <img src="https://wow.zamimg.com/images/icons/money-gold.gif" />
  // <img src="https://wow.zamimg.com/images/icons/money-silver.gif" />
  // <img src="https://wow.zamimg.com/images/icons/money-copper.gif" />

  const unconvertedCost = recipe.craftingCost;

  let individualCost = useConvert(unconvertedCost);
  let totalCost = useConvert(unconvertedCost * quantity);

  // Quick workaround to display tiny icons instead of large
  let icon = recipe.icon.replace("large", "tiny");
  icon = icon.replace("jpg", "gif");

  // Eventually add gold/silver/copper coin icons - maybe this can be a local img resource
  return (
    <tr className="grid grid-cols-5 py-6 px-2">
      <td className="flex items-center font-bold">
        <p>
          {start} to {end}
        </p>
      </td>
      <td className="flex items-center justify-start">
        <img className="m-0" src={`${icon}`}></img>
        <p className="pl-2">{recipe.itemName}</p>
      </td>
      <td className="flex items-center justify-center">x{end - start}</td>
      <td className="flex items-center">Placeholder</td>
      <td className="flex items-center">Vendor/Trainer</td>
    </tr>
  );
};

// Total cost: {totalCost.gold.toLocaleString("en-us")} gold,{" "}
// {totalCost.silver.toLocaleString("en-us")} silver, and{" "}
// {totalCost.copper.toLocaleString("en-us")} copper.
{
  /* <td className="">
        Individual cost:{" "}
        <span className="text-currency-gold font-bold">
          {individualCost.gold.toLocaleString("en-us")}G
        </span>{" "}
        <span className="text-currency-silver font-bold">
          {individualCost.silver.toLocaleString("en-us")}S
        </span>{" "}
        <span className="text-currency-copper font-bold">
          {individualCost.copper.toLocaleString("en-us")}C
        </span>
        .
      </td> */
}

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
