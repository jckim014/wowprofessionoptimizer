import { useLocation } from "react-router-dom";
import OptimalPathTable from "../components/OptimalPathTable";

// This page only works on redirect from request form - edit it a bit for extraneous information because its a engi specific page
const Engineering = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="optimalPathMain">
      <p>***************</p>
      <p name="profession">{data.profession}</p>
      <p name="server">{data.server}</p>
      <p name="faction">{data.faction}</p>
      <p name="startingLevel">Starting Level: {data.startingLevel}</p>
      <p>***************</p>
      <OptimalPathTable startingLevel={data.startingLevel}></OptimalPathTable>
    </div>
  );
};

export default Engineering;
