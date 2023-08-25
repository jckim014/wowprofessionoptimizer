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

  return (
    <div className="pb-4">
      <p className="text-lg font-bold">Profession</p>
      <button
        className="flex justify-between items-center relative w-full text-left 
        border border-color rounded-md cursor-pointer hover p-1 pl-3"
        type="button"
        onClick={toggle}
      >
        {professionState}
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
