import { useEffect, useState } from "react";
// Components
import Recipe from "./Recipe";

const OptimalPathTable = () => {
  const [optimalPath, setOptimalPath] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  // const cost = optimalPath.reduce(function (acc, obj) {
  //   return acc + obj.craftingCost;
  // }, 0);

  useEffect(() => {
    const fetchOptimalPath = async () => {
      const response = await fetch("http://localhost:3000/fetch-optimal-path");
      const json = await response.json();
      console.log(json[0]);

      if (response.ok) {
        setOptimalPath(json);
      }
    };

    fetchOptimalPath();
  }, []);

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
              <td>Total cost is {totalCost}</td>
            </tr>
            {optimalPath &&
              optimalPath.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptimalPathTable;
