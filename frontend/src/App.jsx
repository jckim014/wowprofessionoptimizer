import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and components
import MainDisplay from "./pages/MainDisplay";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/engineering" element={<MainDisplay />} /> */}
              <Route path="/profession/:profession" element={<MainDisplay />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
