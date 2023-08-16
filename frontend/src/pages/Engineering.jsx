import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OptimalPathContent from "../components/OptimalPathContent";

// This page only works on redirect from request form - edit it a bit for extraneous information because its a engi specific page
const Engineering = () => {
  const location = useLocation();
  const data = location.state;

  // Not sure if this works
  if (!data) {
    let data = { startingLevel: 1 };
  }

  return (
    <div className="optimalPathMain flex items-center flex-col bg-darkest pt-20 text-white">
      <OptimalPathContent
        startingLevel={data.startingLevel}
      ></OptimalPathContent>
      {/* <div>
        {" "}
        <p>***************</p>
        <p name="profession">{data.profession}</p>
        <p name="server">{data.server}</p>
        <p name="faction">{data.faction}</p>
        <p name="startingLevel">Starting Level: {data.startingLevel}</p>
        <p>***************</p>
      </div> */}
    </div>
  );
};

export default Engineering;
