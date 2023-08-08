import { useEffect, useState } from "react";

const OptimalPathMain = () => {
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
    <div className="home">
      <h2>Homepage - Optimal Path</h2>
      <div className="optimalPath">
        {optimalPath &&
          optimalPath.map((recipe, index) => <p key={index}>{recipe}</p>)}
      </div>
    </div>
  );
};

export default OptimalPathMain;
