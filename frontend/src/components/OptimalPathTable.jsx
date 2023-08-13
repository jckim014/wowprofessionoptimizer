import { useEffect, useState } from "react";
// Components
import Recipe from "./Recipe";

const OptimalPathTable = (startingLevel) => {
  const [optimalPath, setOptimalPath] = useState(null);
  const [skillRanges, setSkillRanges] = useState(null);

  console.log(skillRanges);
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
              <td>Total cost is $$$</td>
            </tr>
            {optimalPath &&
              optimalPath.map((recipe, index) => (
                <Recipe
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
