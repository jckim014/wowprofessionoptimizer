const SelectServer = ({ serverState, updateServer }) => {
  // Need to somehow generate server list later
  // Turn these into option components
  return (
    <div className="text-black">
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
