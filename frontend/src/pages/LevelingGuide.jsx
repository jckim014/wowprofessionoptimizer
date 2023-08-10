import OptimalPathTable from "../components/OptimalPathTable";
import { useLocation } from "react-router-dom";

const LevelingGuide = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="optimalPathMain">
      <p>***************</p>
      <p name="profession">{data.profession}</p>
      <p name="server">{data.server}</p>
      <p name="faction">{data.faction}</p>
      <p>***************</p>
      {/* pass profession/server/faction props to optimalpathtable */}
      <OptimalPathTable></OptimalPathTable>
    </div>
  );
};

export default LevelingGuide;
