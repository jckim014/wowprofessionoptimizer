import ProfessionDropdown from "./ProfessionDropdown";

import useRowToggle from "../../customhooks/useRowToggle";

const SelectProfession = ({ profession }) => {
  const { isOpen, toggle } = useRowToggle(false);
  return (
    <div className="">
      <button
        className="relative w-full py-2 pl-3 pr-10 text-left bg-gray-700 
      border border-gray-700 rounded-md shadow-sm cursor-pointer 
      hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-main 
      focus:border-brand-main sm:text-sm"
        type="button"
        onClick={toggle}
      >
        {profession}
      </button>
      {isOpen && <ProfessionDropdown />}
      {/* eventually make these buttons change state? */}
    </div>
  );
};

export default SelectProfession;
