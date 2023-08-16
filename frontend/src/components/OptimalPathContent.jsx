import { useEffect, useState } from "react";
import useConvert from "../customhooks/useConvert";
// Components
import ShoppingList from "./ShoppingList";
import OptimalPathRow from "./OptimalPathRow";

const OptimalPathContent = (startingLevel) => {
  const [optimalPath, setOptimalPath] = useState(null);
  const [skillRanges, setSkillRanges] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchOptimalPath = async () => {
      // *** Make this a request with a variable starting level
      const response = await fetch("http://localhost:3000/fetch-optimal-path");
      const json = await response.json();
      console.log(json[0]);

      if (response.ok) {
        setOptimalPath(json);
      }

      // Initialize skill ranges
      const tempArray = [];
      let start = startingLevel.startingLevel ? startingLevel.startingLevel : 1;
      let end = 0;

      for (let i = 0; i < json.length; i++) {
        end = start + json[i].quantityToCraft;
        tempArray.push([start, end]);
        start = end;
      }
      setSkillRanges(tempArray);

      // Calculate total cost
      let currentCost = 0;
      for (let i = 0; i < json.length; i++) {
        currentCost += json[i].craftingCost;
      }
      setTotalCost(currentCost);
    };

    fetchOptimalPath();
  }, []);

  return (
    <div className="content-container flex flex-col">
      <div className="self-center flex flex-col w-3/5 bg-light-gray border border-separate border-color rounded-lg">
        {/* can do border-gray-700 */}
        <h2 className="self-center text-lg font-bold">Shopping List</h2>
        <ShoppingList totalCost={totalCost}></ShoppingList>
      </div>
      <div className="optimal-path-container flex flex-col self-center mt-20 w-3/5 bg-darkest">
        <table className="justify-around border border-separate border-color rounded-lg bg-light-gray">
          <tbody className="">
            <tr className="grid grid-cols-5 font-bold pt-2 px-2">
              <td>Skill Level</td>
              <td>Item</td>
              <td className="flex justify-center">Quantity</td>
              <td>Required Materials</td>
              <td>Learned From:</td>
            </tr>
            {optimalPath &&
              optimalPath.map((recipe, index) => (
                <OptimalPathRow
                  key={index}
                  recipe={recipe}
                  skillRange={skillRanges[index]}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptimalPathContent;
