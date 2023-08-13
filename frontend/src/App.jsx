import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Pages and components
import OptimalPath from "./pages/OptimalPath";
import Home from "./pages/Home";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/optimal-path" element={<OptimalPath />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
