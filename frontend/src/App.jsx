import { useState } from "react";
import "./App.css";
import Home from "./components/Home";

// Add a navbar later

function App() {
  const title = "Welcome to the Profession Optimizer";
  const array = [1, 2, 3];

  const link = "http://www.google.com";
  const specialLink = "http://localhost:3000/calculate-optimal-path";

  // { allows for any valid javascript}
  return (
    <>
      <div className="App">
        <div className="content">
          <Home></Home>
        </div>
        <a href={specialLink}>Calculate Optimal Path</a>
      </div>
    </>
  );
}

export default App;
