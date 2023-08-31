import { useEffect, useState } from "react";
// Components
import ShoppingListContainer from "../shoppinglist/ShoppingListContainer";
import OptimalPathSection from "./OptimalPathSection";
import DeadRealm from "../DeadRealm";

const OptimalPathContent = ({ data, fetchToggle }) => {
  const [optimalPath, setOptimalPath] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [skillRanges, setSkillRanges] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [deadRealm, setDeadRealm] = useState(false);

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

      if (json.deadRealm) {
        setDeadRealm(true);
      } else {
        setDeadRealm(false);
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
      }
    };

    fetchOptimalPath();
  }, [fetchToggle]);

  return (
    <div className="content-container flex flex-col w-full">
      {deadRealm && <DeadRealm server={server} faction={faction} />}

      {!deadRealm && (
        <div className="mb-8 bg-white">
          <ShoppingListContainer
            totalCost={totalCost}
            shoppingList={shoppingList}
            server={server}
            faction={faction}
          ></ShoppingListContainer>
        </div>
      )}
      {!deadRealm && (
        <div className="optimal-path-container flex flex-col bg-white">
          <div className="text-lg font-bold p-1 bg-main">
            Leveling Guide - {server} {faction}
          </div>

          {/* <table className="justify-around border border-separate border-color rounded-md"> */}
          <table className="justify-around border-color border-collapse rounded-md">
            <tbody className="bg-main">
              <tr className="grid grid-cols-5 font-bold pl-2 py-2 border border-color mb-2 bg-white">
                <td>Skill Level</td>
                <td>Item</td>
                <td className="flex justify-center">Quantity</td>
                {/* <td></td> */}
                <td className="flex justify-center">Individual Cost </td>
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
      )}
    </div>
  );
};

export default OptimalPathContent;
