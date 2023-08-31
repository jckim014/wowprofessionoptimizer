import { useEffect, useState } from "react";

const ExpandedRow = ({ recipe, individualCost, totalCost, reagentInfo }) => {
  return (
    <tr className="flex border-l border-r border-b border-color -mt-2 px-2 py-2 mb-4 bg-gray-100">
      {recipe.reagentList.map((reagent, i) => (
        <td className="p-2">{reagent[0]}</td>
      ))}
    </tr>
  );
};

export default ExpandedRow;
