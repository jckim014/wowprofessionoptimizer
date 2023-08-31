import { useEffect, useState } from "react";
import { PiCaretUpDownBold } from "react-icons/pi";

import SelectProfessionDropdown from "./SelectProfessionDropdown";
import useRowToggle from "../../customhooks/useRowToggle";

const SelectProfession = ({ professionState, updateProfession }) => {
  const [openState, setOpenState] = useState(false);

  function closeDropdown() {
    toggle();
  }
  const { isOpen, toggle } = useRowToggle(openState);
  let icon;
  switch (professionState) {
    case "Engineering":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/trade_engineering.gif";
      break;
    case "Alchemy":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/trade_alchemy.gif";
      break;
    case "Blacksmithing":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/trade_blacksmithing.gif";
      break;
    case "Cooking":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/inv_misc_food_15.gif";
      break;
    case "Enchanting":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/trade_engraving.gif";
      break;
    case "First Aid":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/spell_holy_sealofsacrifice.gif";
      break;
    case "Inscription":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/inv_inscription_tradeskill01.gif";
      break;
    case "Jewelcrafting":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/inv_misc_gem_01.gif";
      break;
    case "Leatherworking":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/inv_misc_armorkit_17.gif";
      break;
    case "Tailoring":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/trade_tailoring.gif";
      break;
  }

  return (
    <div className="pb-6">
      <p className="pb-2 text-lg font-bold">Profession</p>
      <button
        className="flex justify-between items-center relative w-full text-left 
        border border-color rounded-md cursor-pointer hover p-1 pl-3"
        type="button"
        onClick={toggle}
      >
        {" "}
        <img className="pr-1" src={icon}></img>
        <span className="mr-auto">{professionState}</span>
        <PiCaretUpDownBold
          className="item-color"
          size="1.75em"
        ></PiCaretUpDownBold>
      </button>
      <div className="relative">
        {isOpen && (
          <SelectProfessionDropdown
            updateProfession={updateProfession}
            closeDropdown={closeDropdown}
          />
        )}
      </div>
    </div>
  );
};

export default SelectProfession;
