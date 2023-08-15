import { useEffect, useState } from "react";
// Components
import OptimalPathRow from "./OptimalPathRow";

const OptimalPathTable = (startingLevel) => {
  const [optimalPath, setOptimalPath] = useState(null);
  const [skillRanges, setSkillRanges] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  // Reusing this function from recipe - clean it up later?
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

  const readableCost = convertPrice(totalCost);

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
  //console.log(currentLevel);
  return (
    <div className="OptimalPathTable">
      <h2>Optimal Path</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>List of Recipes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Total cost: {readableCost.gold.toLocaleString("en-us")} gold,{" "}
                {readableCost.silver.toLocaleString("en-us")} silver, and{" "}
                {readableCost.copper.toLocaleString("en-us")} copper.
              </td>
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

export default OptimalPathTable;
