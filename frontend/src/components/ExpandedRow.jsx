const ExpandedRow = ({ recipe, individualCost, totalCost }) => {
  return (
    <tr className="flex bg-gray-600">
      <td>{recipe.itemName}</td>
      <td>Individual cost = 1g </td>
      <td>Total cost = 10g </td>
    </tr>
  );
};

export default ExpandedRow;
