import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OptimalPathContent from "../components/optimalpath/OptimalPathContent";
import SelectForm from "../components/selectform/SelectForm";

// This page only works on redirect from request form
const MainDisplay = () => {
  const [fetchToggle, setFetchToggle] = useState(false);

  function updateFetchToggle(currentToggle) {
    setFetchToggle(!currentToggle);
  }

  const location = useLocation();
  const data = location.state;

  let profession = "Engineering";
  let faction = "Alliance";
  let startingLevel = "1";
  let server = "Benediction";

  // if (data) {
  //   profession = data.profession;
  //   faction = data.faction;
  //   startingLevel = data.startingLevel;
  //   server = data.server;
  // }

  // data has .profession .server .faction .startingLevel

  return (
    <div className="flex pt-16 bg-main justify-around">
      <div className="flex w-1/4 p-8">
        <SelectForm
          profession={profession}
          server={server}
          faction={faction}
          startingLevel={startingLevel}
          fetchToggle={fetchToggle}
          updateFetchToggle={updateFetchToggle}
        ></SelectForm>
      </div>
      {data == undefined && <p className="mt-16">Test hello hello</p>}
      {data != undefined && (
        <div className="optimalPathMain w-3/4 flex flex-col items-center  ">
          <OptimalPathContent
            data={data}
            fetchToggle={fetchToggle}
          ></OptimalPathContent>
        </div>
      )}
    </div>
  );
};

export default MainDisplay;
