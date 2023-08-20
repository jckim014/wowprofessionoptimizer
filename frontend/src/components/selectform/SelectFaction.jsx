const SelectFaction = ({ factionState, updateFaction }) => {
  return (
    <div className="flex justify-around pt-4 ">
      <button
        className="flex flex-col items-center place-self-center mt-8 
        relative w-1/3 py-1 mt-1 overflow-auto text-base 
        bg-gray-700 shadow-lg max-h-80 ring-1 ring-black 
        ring-opacity-5 focus:outline-none focus:bg-gray-600 
        rounded-md sm:text-sm focus:bg-gray-600 hover:bg-gray-600
        "
        value={factionState}
        onClick={(e) => {
          updateFaction("Alliance");
        }}
      >
        <span>
          <img
            src="https://www.warcrafttavern.com/wp-content/uploads/2021/07/WoW-Alliance-Crest.png"
            className="w-10"
          ></img>
        </span>
        <span> Alliance</span>
      </button>
      <button
        className="flex flex-col items-center place-self-center mt-8 
        relative w-1/3 py-1 mt-1 overflow-auto text-base 
        bg-gray-700 shadow-lg max-h-80 ring-1 ring-black 
        ring-opacity-5 focus:outline-none sm:text-sm
        rounded-md focus:bg-gray-600 hover:bg-gray-600"
        value={factionState}
        onClick={(e) => {
          updateFaction("Horde");
        }}
      >
        <span>
          <img
            src="https://www.warcrafttavern.com/wp-content/uploads/2021/07/WoW-Horde-Crest.png"
            className="w-10"
          ></img>
        </span>
        <span> Horde </span>
      </button>
    </div>
  );
};

export default SelectFaction;
