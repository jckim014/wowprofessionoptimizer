import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectProfession from "./SelectProfession";
import SelectStartingLevel from "./SelectStartingLevel";
import SelectServer from "./SelectServer";
import SelectFactionSwitch from "./SelectFactionSwitch";
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
      <div className="flex flex-col p-4 border-2 border-separate border-color rounded-md bg-white">
        <SelectProfession
          professionState={professionState}
          updateProfession={updateProfession}
        ></SelectProfession>
        <SelectServer
          serverState={serverState}
          updateServer={updateServer}
        ></SelectServer>
        <SelectStartingLevel
          startingLevelState={startingLevelState}
          updateStartingLevel={updateStartingLevel}
        ></SelectStartingLevel>
        <SelectFactionSwitch
          factionState={factionState}
          updateFaction={updateFaction}
        ></SelectFactionSwitch>
        <RiskToleranceToggle
          riskToleranceState={riskToleranceState}
          updateRiskTolerance={updateRiskTolerance}
        ></RiskToleranceToggle>

        <button
          type="submit"
          className="item-bg place-self-center mt-4 relative w-full p-2 hover
          shadow-lg focus:outline-none
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
