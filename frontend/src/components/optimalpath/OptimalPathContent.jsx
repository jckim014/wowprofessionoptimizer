import { useEffect, useState } from "react";
import useConvert from "../../customhooks/useConvert";
// Components
import ShoppingListContainer from "../shoppinglist/ShoppingListContainer";
import OptimalPathSection from "./OptimalPathSection";

const OptimalPathContent = ({ data, fetchToggle }) => {
  const [optimalPath, setOptimalPath] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [skillRanges, setSkillRanges] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  let profession = data.profession;
  let server = data.server;
  let faction = data.faction;
  let startingLevel = data.startingLevel;
  let riskTolerance = data.riskTolerance; // this isn't in the home page request form yet

  useEffect(() => {
    const fetchOptimalPath = async () => {
      const data = {
        profession: profession,
        server: server,
        faction: faction,
        startingLevel: startingLevel,
        riskTolerance: riskTolerance,
      };

      const request = JSON.stringify(data);

      const response = await fetch(
        "http://localhost:3000/calculate-optimal-path",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: request,
        }
      );
      const json = await response.json();

      const optimalPathObject = json.optimalPathData;
      const shoppingListObject = json.shoppingListData;

      if (response.ok) {
        setOptimalPath(optimalPathObject);
        setShoppingList(shoppingListObject);
      }

      // Initialize skill ranges
      const tempArray = [];
      let start = startingLevel ? startingLevel : 1;
      let end = 0;

      start = Number(start);

      for (let i = 0; i < optimalPathObject.length; i++) {
        end = start + optimalPathObject[i].quantityToCraft;
        tempArray.push([start, end]);
        start = end;
      }
      setSkillRanges(tempArray);

      // Calculate total cost
      let currentCost = 0;
      for (let i = 0; i < shoppingListObject.length; i++) {
        let individualCost = shoppingListObject[i].price;
        let quantity = shoppingListObject[i].requiredAmount;
        let totalCost = individualCost * quantity;
        currentCost += totalCost;
      }
      setTotalCost(currentCost);
    };

    fetchOptimalPath();
  }, [fetchToggle]);

  return (
    <div className="content-container flex flex-col">
      <div
        className="self-center flex flex-col m-24 my-0 bg-light-gray 
      border border-separate border-color rounded-lg"
      >
        {/* can do border-gray-700 */}
        <h2 className="self-center text-lg font-bold">Shopping List</h2>
        <ShoppingListContainer
          totalCost={totalCost}
          shoppingList={shoppingList}
        ></ShoppingListContainer>
      </div>
      <div className="optimal-path-container flex flex-col self-center m-24">
        {/* add in "header" divs and break path into multiple tables */}
        <table className="justify-around border border-separate border-color rounded-lg bg-light-gray">
          <tbody className="">
            <tr className="grid grid-cols-5 font-bold pt-2 px-2">
              <td>Skill Level</td>
              <td>Item</td>
              <td className="flex justify-center">Quantity</td>
              <td>Required Materials</td>
              <td>Learned From:</td>
            </tr>
          </tbody>
          {optimalPath &&
            optimalPath.map((recipe, index) => (
              <OptimalPathSection
                key={index}
                recipe={recipe}
                skillRange={skillRanges[index]}
              />
            ))}
        </table>
      </div>
    </div>
  );
};

export default OptimalPathContent;
