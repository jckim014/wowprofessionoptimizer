const EmptyPrompt = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full border-2 border-separate border-color rounded-md bg-white">
      <p className="text-lg font-bold p-2">
        (Please wait 1-2 minutes to allow application to spin up from inactivity
        and retrieve data if this is your first time here!)
      </p>
      <p className="text-lg font-bold p-2">
        Please <span className="">select</span> the details of your leveling
        guide
      </p>
      <p className="">Use the panel on the left to make your selections</p>
      {/* <p className="text-lg font-bold">
        Please select your Profession, Server, Starting Level, Faction, and Risk
        Tolerance.
      </p> */}
    </div>
  );
};

export default EmptyPrompt;
