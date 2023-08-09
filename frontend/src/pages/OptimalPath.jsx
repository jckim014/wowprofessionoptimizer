import OptimalPathTable from "../components/OptimalPathTable";
import { useLocation } from "react-router-dom";

const DisplayOptimalPath = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="optimalPathMain">
      <p>***************</p>
      <p name="profession">{data.profession}</p>
      <p name="server">{data.server}</p>
      <p name="faction">{data.faction}</p>
      <p>***************</p>
      <OptimalPathTable></OptimalPathTable>
    </div>
  );
};

export default DisplayOptimalPath;
