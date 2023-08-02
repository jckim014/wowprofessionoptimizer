import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Greeting, { TestFunction, Test2 } from "./components/Greeting.jsx";
import Tutorial from "./components/JsxTutorial.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Tutorial></Tutorial>
  </React.StrictMode>
);
