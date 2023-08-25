const SelectStartingLevel = ({ startingLevelState, updateStartingLevel }) => {
  return (
    <div className="flex flex-col justify-around relative w-full py-1 mb-3 overflow-auto">
      <p className="">Starting Level: {startingLevelState}</p>
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
        className=""
        type="number"
        min="1"
        max="449"
        value={startingLevelState}
        onChange={(e) => {
          updateStartingLevel(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default SelectStartingLevel;
