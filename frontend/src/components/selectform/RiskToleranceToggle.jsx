const RiskToleranceToggle = ({ riskToleranceState, updateRiskTolerance }) => {
  return (
    <div className="flex items-center">
      <p className="pr-3">Guaranteed skillups only</p>
      <input
        type="checkbox"
        onClick={(e) => {
          updateRiskTolerance(riskToleranceState);
        }}
      ></input>
    </div>
  );
};

export default RiskToleranceToggle;
