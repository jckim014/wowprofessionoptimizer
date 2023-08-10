const Recipe = ({ recipe }) => {
  // Add state to record total cost

  // Not sure where price conversion should ultimately go
  // Initialize gold/silver/copper coins
  const unconvertedCost = recipe.craftingCost;
  let gold = 0;
  let silver = 0;
  let copper = 0;

  // Calculate gold
  gold = Math.floor(unconvertedCost / 100);
  let remainder = unconvertedCost % 100;
  // Calculate silver
  silver = remainder;
  remainder = Math.floor(remainder / 100);
  // Calculate copper
  copper = remainder;

  // Eventually add gold/silver/copper coin icons - maybe this can be a local img resource
  return (
    <tr className="recipe">
      <td>Available at: {recipe.difficultyColors[0]}</td>
      <td>{recipe.itemName}</td>
      <td>{recipe.craftedItemID}</td>
      <td>
        <img src={`${recipe.icon}`}></img>
      </td>
      <td>
        This item costs {gold} gold, {silver} silver, and {copper} copper.
      </td>
    </tr>
  );
};

export default Recipe;
