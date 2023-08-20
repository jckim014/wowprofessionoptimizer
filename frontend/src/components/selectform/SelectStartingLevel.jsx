const SelectStartingLevel = ({ startingLevelState, updateStartingLevel }) => {
  return (
    <div
      className="flex justify-around relative w-full py-1 mb-3 overflow-auto text-base 
  bg-gray-700 shadow-lg max-h-80 ring-1 ring-black 
  ring-opacity-5 focus:outline-none sm:text-sm
  rounded-md"
    >
      <p className="text-sm font-medium text-gray-400">Starting Level</p>
      <input
        type="range"
        min="1"
        max="449"
        value={startingLevelState}
        onChange={(e) => {
          e.preventDefault();
          updateStartingLevel(e.target.value);
        }}
      ></input>
      <input
        type="number"
        min="1"
        max="449"
        value={startingLevelState}
        onChange={(e) => {
          updateStartingLevel(e.target.value);
        }}
        className="text-black"
      ></input>
    </div>
  );
};

export default SelectStartingLevel;
