const Recipe = ({ recipe }) => {
  return (
    <tr className="recipe">
      <td>{recipe.itemName}</td>
      <td>{recipe.craftedItemID}</td>
    </tr>
  );
};

export default Recipe;
