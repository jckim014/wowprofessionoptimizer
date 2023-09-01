const DeadRealm = ({ server, faction }) => {
  return (
    <div className="h-96 flex flex-col justify-center items-center w-full border-2 border-separate border-color rounded-md bg-white">
      <p className="text-left p-2">
        The auction house on{" "}
        <span className="font-bold">
          {server} - {faction}
        </span>{" "}
        does not have enough auctions to support leveling a profession.
      </p>
      <p className="p-2">
        You have probably chosen the wrong faction on a single faction
        megaserver.
      </p>
      <p className="p-2">
        (Try changing factions or use{" "}
        <span className="font-bold">Benediction - Alliance</span> for testing
        purposes)
      </p>
      {/* <p className="text-lg font-bold">
        Please select your Profession, Server, Starting Level, Faction, and Risk
        Tolerance.
      </p> */}
    </div>
  );
};

export default DeadRealm;
