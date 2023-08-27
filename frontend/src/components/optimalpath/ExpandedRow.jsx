const ExpandedRow = ({ recipe, individualCost, totalCost }) => {
  return (
    <tr className="flex border-l border-r border-b border-color -mt-2 px-2 py-2 mb-4 bg-gray-100">
      <td>{recipe.itemName}</td>
      <td>Individual cost = 1g </td>
      <td>Total cost = 10g </td>
    </tr>
  );
};

export default ExpandedRow;
