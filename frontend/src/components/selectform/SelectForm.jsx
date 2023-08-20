import SelectProfession from "./SelectProfession";

const SelectForm = ({ profession, server, faction, startingLevel }) => {
  return (
    <aside className="flex flex-col w-full">
      <SelectProfession profession={profession}></SelectProfession>
    </aside>
  );
};

export default SelectForm;
