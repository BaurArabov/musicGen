import "./App.css";
import React from "react";
import LeftSideBar from "./components/LeftSideBar/leftSideBar";
import MainPage from "./components/MainPage/mainPage";
import Login from "./components/Login/login";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? (
    <div className="App">
      <LeftSideBar />
      <MainPage code={code} />
    </div>
  ) : (
    <Login />
  );
}

export default App;
