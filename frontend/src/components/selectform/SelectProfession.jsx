import { useEffect, useState } from "react";

import ProfessionDropdown from "./ProfessionDropdown";
import useRowToggle from "../../customhooks/useRowToggle";
import { PiCaretUpDownBold } from "react-icons/pi";

const SelectProfession = ({ professionState, updateProfession }) => {
  const [openState, setOpenState] = useState(false);

  function closeDropdown() {
    toggle();
  }
  const { isOpen, toggle } = useRowToggle(openState);

  return (
    <div className="">
      <button
        className="flex justify-between items-center relative w-full py-2 px-3 text-left bg-gray-700 
      border border-gray-700 rounded-md shadow-sm cursor-pointer 
      hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-main 
      focus:border-brand-main sm:text-sm"
        type="button"
        onClick={toggle}
      >
        {professionState}
        <PiCaretUpDownBold size="1.75em"></PiCaretUpDownBold>
      </button>
      {isOpen && (
        <ProfessionDropdown
          updateProfession={updateProfession}
          closeDropdown={closeDropdown}
        />
      )}
      {/* eventually make these buttons change state? */}
    </div>
  );
};

export default SelectProfession;
