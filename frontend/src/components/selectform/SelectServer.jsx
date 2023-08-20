const SelectServer = ({ serverState, updateServer }) => {
  // Need to somehow generate server list later
  // Turn these into option components
  return (
    <div
      className="flex text-black justify-between items-center relative w-full py-2 px-3 text-left bg-gray-700 
    border border-gray-700 rounded-md shadow-sm cursor-pointer 
    hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-main 
    focus:border-brand-main sm:text-sm mb-3"
    >
      <div className="text-white">Server: </div>
      <select
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
