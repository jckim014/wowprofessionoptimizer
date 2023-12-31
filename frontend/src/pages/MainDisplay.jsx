import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OptimalPathContent from "../components/optimalpath/OptimalPathContent";
import SelectForm from "../components/selectform/SelectForm";
import EmptyPrompt from "../components/EmptyPrompt";

const MainDisplay = () => {
  const [fetchToggle, setFetchToggle] = useState(false);
  // useEffect(() => {
  //   const pingBackend = async () => {
  //     const response = await fetch("https://wotlk-app.onrender.com/ping", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const json = await response.json();
  //     console.log(json.hello);
  //   };
  //   pingBackend();
  // }, []);

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
    <div className="flex bg-main justify-around h-screen">
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
      <div className="flex w-3/4 h-1/2 p-8">
        {data == undefined && <EmptyPrompt></EmptyPrompt>}
        {data != undefined && (
          <div className="optimalPathMain flex flex-col items-center h-full w-full">
            <OptimalPathContent
              data={data}
              fetchToggle={fetchToggle}
            ></OptimalPathContent>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDisplay;
