import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Pages and components
import LevelingGuide from "./pages/LevelingGuide";
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
              <Route path="/optimal-path" element={<LevelingGuide />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
