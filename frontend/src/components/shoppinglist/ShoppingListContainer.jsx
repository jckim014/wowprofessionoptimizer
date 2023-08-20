import useConvert from "../../customhooks/useConvert";
import ShoppingItem from "./ShoppingItem";

const ShoppingListContainer = ({ totalCost, shoppingList }) => {
  const readableCost = useConvert(totalCost);
  return (
    <div className="">
      <div className="">
        <p>
          <span className="font-bold">Total Cost: </span>
          <span className="text-currency-gold">
            {readableCost.gold.toLocaleString("en-us")}g{" "}
          </span>
          <span className="text-currency-silver">
            {readableCost.silver.toLocaleString("en-us")}s{" "}
          </span>
          <span className="text-currency-copper">
            {readableCost.copper.toLocaleString("en-us")}c
          </span>
        </p>
      </div>
      {/* <div className="flex flex-row flex-wrap overflow-scroll"> */}
      <div className="grid max-h-40 grid-cols-4 overflow-y-scroll">
        {shoppingList &&
          shoppingList.map((item, index) => (
            <ShoppingItem key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default ShoppingListContainer;
