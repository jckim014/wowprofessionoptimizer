import { useState } from "react";
import "./App.css";
import OptimalPathMain from "./components/OptimalPathMain";

// Add a navbar later

function App() {
  const specialLink = "/fetch-optimal-path";

  // { allows for any valid javascript}
  return (
    <>
      <div className="App">
        <div className="content">
          <OptimalPathMain />
        </div>
        <a href={specialLink}>Calculate Optimal Path</a>
      </div>
    </>
  );
}

export default App;
