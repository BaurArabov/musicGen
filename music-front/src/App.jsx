import "./App.css";
import React from "react";
import LeftSideBar from "./components/LeftSideBar";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
      <LeftSideBar />
      <MainPage />
    </div>
  );
}

export default App;
