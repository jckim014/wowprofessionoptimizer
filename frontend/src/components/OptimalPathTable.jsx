import { useEffect, useState } from "react";
// Components
import Recipe from "./Recipe";

const OptimalPathTable = () => {
  const [optimalPath, setOptimalPath] = useState(null);

  useEffect(() => {
    const fetchOptimalPath = async () => {
      const response = await fetch("http://localhost:3000/fetch-optimal-path");
      console.log(response);
      const json = await response.json();

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
              optimalPath.map((recipeName, index) => (
                <Recipe key={index} recipeName={recipeName} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptimalPathTable;
