import ShoppingItem from "./ShoppingItem";

const ShoppingListDropdown = ({ totalCost, shoppingList, server, faction }) => {
  return (
    <div className="flex flex-col items-center border border-color rounded-md border-t-0">
      {/* <div className="flex flex-row flex-wrap overflow-scroll"> */}
      {/* <div className="grid max-h-40 grid-cols-4 overflow-y-scroll"> */}
      <div className="flex flex-col flex-wrap min-w-full max-w-full max-h-screen items-center overflow-scroll">
        {shoppingList &&
          shoppingList.map((item, index) => (
            <ShoppingItem key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default ShoppingListDropdown;
