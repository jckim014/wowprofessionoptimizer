import { useEffect, useState } from "react";

const ExpandedRow = ({ recipe, individualCost, totalCost, reagentInfo }) => {
  return (
    <tr className="flex flex-col border-l border-r border-b border-color -mt-2 px-2 py-2 mb-4 bg-gray-100">
      <div className="flex font-bold p-2 pl-1">Individual Reagents:</div>
      <div className="flex flex-row">
        {recipe.reagentList.map((reagent, i) => (
          <div className="flex pr-8 pb-2 pl-1 flex-wrap" key={i}>
            <p className="pr-1">x{reagent[1]}</p>
            <img
              className="object-none pr-1"
              src={`https://wow.zamimg.com/images/wow/icons/tiny/${
                reagentInfo[reagent[0]].icon
              }.gif`}
            ></img>
            <a
              className="wowhead-link"
              href={`https://www.wowhead.com/wotlk/item=${reagent[0]}/${
                reagentInfo[reagent[0]].name_enus
              }`}
            >
              {reagentInfo[reagent[0]].name_enus}
            </a>
          </div>
        ))}
      </div>
      <div className="flex font-bold p-2 pl-1">Total Reagents:</div>
      <div className="flex flex-row">
        {recipe.reagentList.map((reagent, i) => (
          <div className="flex pr-8 pb-2 pl-1 flex-wrap" key={i}>
            <p className="pr-1">x{reagent[1] * recipe.quantityToCraft}</p>
            {console.log(recipe)}
            <img
              className="object-none pr-1"
              src={`https://wow.zamimg.com/images/wow/icons/tiny/${
                reagentInfo[reagent[0]].icon
              }.gif`}
            ></img>
            <a
              className="wowhead-link"
              href={`https://www.wowhead.com/wotlk/item=${reagent[0]}/${
                reagentInfo[reagent[0]].name_enus
              }`}
            >
              {reagentInfo[reagent[0]].name_enus}
            </a>
          </div>
        ))}
      </div>
    </tr>
  );
};

export default ExpandedRow;
