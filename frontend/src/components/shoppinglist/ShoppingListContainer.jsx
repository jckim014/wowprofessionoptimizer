import { useEffect, useState } from "react";

import ShoppingListDropdown from "./ShoppingListDropdown";
import useRowToggle from "../../customhooks/useRowToggle";
import useConvert from "../../customhooks/useConvert";

const ShoppingListContainer = ({
  totalCost,
  shoppingList,
  server,
  faction,
}) => {
  const [openState, setOpenState] = useState(false);

  function closeDropdown() {
    toggle();
  }
  const { isOpen, toggle } = useRowToggle(openState);

  const readableCost = useConvert(totalCost);
  return (
    <div>
      <div
        className="flex self-start pl-4 pb-2 border border-color rounded-md hover cursor-pointer"
        onClick={toggle}
      >
        <h2 className="self-center text-lg font-bold">Shopping List</h2>
        <p>
          <span className="font-bold">
            Total Cost on {server} - {faction}{" "}
          </span>
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
      <div>
        {isOpen && (
          <ShoppingListDropdown
            totalCost={totalCost}
            shoppingList={shoppingList}
            server={server}
            faction={faction}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingListContainer;
