import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and components
import Engineering from "./pages/Engineering";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages margin-top">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/engineering" element={<Engineering />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
