const SelectServer = ({ serverState, updateServer }) => {
  // Need to somehow generate server list later
  // Turn these into option components
  return (
    <div className="pb-2">
      <p className="text-lg font-bold">Server</p>
      <select
        className="flex justify-between items-center relative w-full text-left 
        border border-color rounded-md cursor-pointer hover py-1 pl-3 focus:outline-none"
        defaultValue={serverState}
        onChange={(e) => {
          console.log("click");
          console.log("click");
          updateServer(e.target.value);
        }}
      >
        <option value="Benediction">Benediction</option>
        <option value="Faerlina">Faerlina</option>
      </select>
    </div>
  );
};

export default SelectServer;
