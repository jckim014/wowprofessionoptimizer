const SelectStartingLevel = ({ startingLevelState, updateStartingLevel }) => {
  return (
    <div className="flex flex-col w-full pb-6">
      <div className="flex items-center pb-2">
        <p className="flex flex-row text-lg font-bold">Starting Level:</p>
        <div className="w-16 pl-4 text-base font-normal">
          <input
            className="w-full bg-main border border-color text-center"
            type="number"
            min="1"
            max="449"
            value={startingLevelState}
            onChange={(e) => {
              updateStartingLevel(e.target.value);
            }}
          ></input>
        </div>
      </div>
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
    </div>
  );
};

export default SelectStartingLevel;
