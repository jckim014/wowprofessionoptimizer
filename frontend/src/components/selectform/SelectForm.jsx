import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectProfession from "./SelectProfession";
import SelectStartingLevel from "./SelectStartingLevel";
import SelectServer from "./SelectServer";
import SelectFaction from "./SelectFaction";
import RiskToleranceToggle from "./RiskToleranceToggle";

const SelectForm = ({
  profession,
  server,
  faction,
  startingLevel,
  fetchToggle,
  updateFetchToggle,
}) => {
  const [professionState, setProfessionState] = useState(profession);
  const [serverState, setServerState] = useState(server);
  const [factionState, setFactionState] = useState(faction);
  const [startingLevelState, setStartingLevelState] = useState(startingLevel);
  const [riskToleranceState, setRiskToleranceState] = useState(false);

  function updateProfession(newProfession) {
    setProfessionState(newProfession);
  }
  function updateStartingLevel(newLevel) {
    setStartingLevelState(newLevel);
  }
  function updateServer(newServer) {
    setServerState(newServer);
  }
  function updateFaction(newFaction) {
    setFactionState(newFaction);
  }
  function updateRiskTolerance(newRiskTolerance) {
    setRiskToleranceState(!newRiskTolerance);
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let path = professionState.toLocaleLowerCase();

    const data = {
      profession: professionState,
      server: serverState,
      faction: factionState,
      startingLevel: startingLevelState,
      riskTolerance: riskToleranceState,
    };
    navigate(`/profession/${path}`, {
      state: data,
    });

    updateFetchToggle(fetchToggle);
  };

  return (
    <aside className="flex flex-col w-full">
      <div
        className="flex flex-col bg-light-gray p-4 bg-light-gray 
      border border-separate border-color rounded-lg"
      >
        <SelectProfession
          professionState={professionState}
          updateProfession={updateProfession}
        ></SelectProfession>
        <SelectStartingLevel
          startingLevelState={startingLevelState}
          updateStartingLevel={updateStartingLevel}
        ></SelectStartingLevel>
        {/* need to add EU vs NA functionality */}
        <SelectServer
          serverState={serverState}
          updateServer={updateServer}
        ></SelectServer>
        <RiskToleranceToggle
          riskToleranceState={riskToleranceState}
          updateRiskTolerance={updateRiskTolerance}
        ></RiskToleranceToggle>
        <div>
          {riskToleranceState && "True"}
          {!riskToleranceState && "False"}
        </div>
        <SelectFaction
          factionState={factionState}
          updateFaction={updateFaction}
        ></SelectFaction>
        <button
          type="submit"
          className="place-self-center mt-8 relative w-1/3 py-1 mt-1 overflow-auto text-base 
          bg-gray-700 shadow-lg max-h-80 ring-1 ring-black 
          ring-opacity-5 focus:outline-none sm:text-sm
          rounded-md"
          onClick={handleSubmit}
        >
          Calculate
        </button>
      </div>
    </aside>
  );
};

export default SelectForm;
