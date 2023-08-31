import ExpandedRow from "./ExpandedRow";

import useConvert from "../../customhooks/useConvert";
import useRowToggle from "../../customhooks/useRowToggle";

const OptimalPathSection = ({ recipe, skillRange, reagentInfo }) => {
  const { isOpen, toggle } = useRowToggle(false);

  const start = skillRange[0];
  const end = skillRange[1];
  const quantity = end - start;

  const unconvertedCost = recipe.craftingCost;
  // console.log(recipe);
  let individualCost = useConvert(unconvertedCost);
  let totalCost = useConvert(unconvertedCost * quantity);

  // Quick workaround to display tiny icons instead of large
  let icon = recipe.icon.replace("large", "tiny");
  icon = icon.replace("jpg", "gif");

  // Eventually add gold/silver/copper coin icons - maybe this can be a local img resource
  return (
    <tbody className="bg-main">
      <tr
        className="grid grid-cols-5 py-6 px-2 cursor-pointer hover
        border border-color mb-2 bg-white"
        onClick={toggle}
      >
        <td className="flex items-center">
          <p>
            {start} to {end}
          </p>
        </td>
        <td className="flex items-center justify-start">
          <img className="m-0" src={`${icon}`}></img>
          <a className="pl-2 wowhead-link" href={recipe.link}>
            {recipe.itemName}
          </a>
        </td>
        <td className="flex items-center justify-center">x{end - start}</td>
        <td className="flex justify-center">
          <div className="flex flex-row pl-2">
            {individualCost.gold != 0 && (
              <div className="currency-text-gold font-bold">
                {individualCost.gold.toLocaleString("en-us")}g&nbsp;
              </div>
            )}
            {individualCost.silver != 0 && (
              <div className="currency-text-silver font-bold">
                {individualCost.silver.toLocaleString("en-us")}s&nbsp;
              </div>
            )}
            {individualCost.copper != 0 && (
              <div className="currency-text-copper font-bold">
                {individualCost.copper.toLocaleString("en-us")}c&nbsp;
              </div>
            )}
          </div>
        </td>
        {/* <td className="flex items-center">Placeholder</td> */}
        {/* <td className="flex items-center">Vendor/Trainer</td> */}
        <td className="flex items-center justify-center">
          <div>
            {" "}
            <span
              className="material-symbols-outlined ml-auto"
              style={{
                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                transition: "all",
              }}
            >
              expand_more
            </span>
          </div>
        </td>
      </tr>
      {isOpen && (
        <ExpandedRow
          recipe={recipe}
          individualCost={individualCost}
          totalCost={totalCost}
          reagentInfo={reagentInfo}
        ></ExpandedRow>
      )}
    </tbody>
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

export default OptimalPathSection;
