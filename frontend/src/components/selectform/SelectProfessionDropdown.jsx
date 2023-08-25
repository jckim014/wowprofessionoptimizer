import ProfessionListItem from "./ProfessionListItem";

const SelectProfessionDropdown = ({ updateProfession, closeDropdown }) => {
  const professionList = [
    "Alchemy",
    "Blacksmithing",
    "Cooking",
    "Enchanting",
    "Engineering",
    "First Aid",
    "Inscription",
    "Jewelcrafting",
    "Leatherworking",
    "Tailoring",
  ];
  return (
    <ul className="absolute w-full bg-white z-20 mt-1 border border-color rounded-md">
      {professionList.map((profession, index) => (
        <ProfessionListItem
          key={index}
          profession={profession}
          updateProfession={updateProfession}
          closeDropdown={closeDropdown}
        />
      ))}
    </ul>
  );
};

export default SelectProfessionDropdown;
