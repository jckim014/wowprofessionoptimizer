import useRowToggle from "../../customhooks/useRowToggle";

const ProfessionListItem = ({
  profession,
  updateProfession,
  closeDropdown,
}) => {
  return (
    <li
      className="hover cursor-pointer select-none relative py-2 pl-3 pr-9"
      value={{ profession }}
      onClick={() => {
        updateProfession(profession);
        closeDropdown();
      }}
    >
      {profession}
    </li>
  );
};

export default ProfessionListItem;
