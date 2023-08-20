import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OptimalPathContent from "../components/optimalpath/OptimalPathContent";
import SelectForm from "../components/selectform/SelectForm";

// This page only works on redirect from request form
const Engineering = () => {
  const location = useLocation();
  const data = location.state;

  // data has .profession .server .faction .startingLevel

  return (
    <div className="flex pt-20 bg-darkest text-white justify-around">
      <div className="flex w-1/3 pl-5">
        <SelectForm
          profession={data.profession}
          server={data.server}
          faction={data.faction}
          startingLevel={data.startingLevel}
        ></SelectForm>
      </div>
      <div className="optimalPathMain flex items-center flex-col ">
        <OptimalPathContent
          startingLevel={data.startingLevel}
        ></OptimalPathContent>
      </div>
    </div>
  );
};

export default Engineering;
