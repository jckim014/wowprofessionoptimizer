import ProfessionListItem from "./ProfessionListItem";

const ProfessionDropdown = ({ updateProfession, closeDropdown }) => {
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
    <ul
      className="w-full z-20 py-1 mt-1 overflow-auto text-base 
    bg-gray-700 rounded-md shadow-lg max-h-80 ring-1 ring-black 
    ring-opacity-5 focus:outline-none sm:text-sm"
    >
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

export default ProfessionDropdown;
