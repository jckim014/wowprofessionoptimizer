import { useEffect, useState } from "react";
import { PiCaretUpDownBold } from "react-icons/pi";

import SelectServerDropdown from "./SelectServerDropdown";
import useRowToggle from "../../customhooks/useRowToggle";

const SelectServer = ({ serverState, updateServer }) => {
  const [openState, setOpenState] = useState(false);

  function closeDropdown() {
    toggle();
  }
  const { isOpen, toggle } = useRowToggle(openState);

  // Need to somehow generate server list later
  // Turn these into option components
  return (
    <div className="pb-6">
      <p className="pb-2 text-lg font-bold">Server</p>
      <button
        className="flex justify-between items-center relative w-full text-left 
        border border-color rounded-md cursor-pointer hover p-1 pl-3"
        type="button"
        onClick={toggle}
      >
        {serverState}
        <PiCaretUpDownBold
          className="item-color"
          size="1.75em"
        ></PiCaretUpDownBold>
      </button>
      <div className="relative">
        {isOpen && (
          <SelectServerDropdown
            updateServer={updateServer}
            closeDropdown={closeDropdown}
          />
        )}
      </div>
    </div>
  );
};

export default SelectServer;
