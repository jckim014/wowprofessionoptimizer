import { useEffect, useState } from "react";
// Components
import Recipe from "./Recipe";

const OptimalPathTable = () => {
  const [optimalPath, setOptimalPath] = useState(null);

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
            {optimalPath &&
              optimalPath.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
                // add more info than just the recipe name (from the backend to use here)
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptimalPathTable;
