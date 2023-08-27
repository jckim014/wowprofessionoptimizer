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
        className="flex p-2 self-start border border-color rounded-md hover cursor-pointer
        items-center"
        onClick={toggle}
      >
        <div className="text-lg font-bold">Shopping List</div>
        <div className="flex flex-row pl-3 pb-0.5">
          <div className="currency-gold border rounded-md p-1 mr-1">
            {readableCost.gold.toLocaleString("en-us")}g
          </div>
          <div className="currency-silver border rounded-md p-1 mr-1">
            {" "}
            {readableCost.silver.toLocaleString("en-us")}s
          </div>
          <div className="currency-copper border rounded-md p-1 mr-1">
            {readableCost.copper.toLocaleString("en-us")}c
          </div>
        </div>
        <div className="flex items-center ml-auto pr-2 toggle-color">
          {!isOpen && (
            <span
              className="material-symbols-outlined pt-1"
              style={{
                transition: "all",
              }}
            >
              add
            </span>
          )}
          {isOpen && (
            <span
              className="material-symbols-outlined pt-1 toggle-color"
              style={{
                transition: "all",
              }}
            >
              close
            </span>
          )}
        </div>
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
