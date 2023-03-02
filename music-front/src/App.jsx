// import "./App.css";
// import LeftSideBar from "./components/LeftSideBar";
// import MainPage from "./components/MainPage";
// import Player from "./components/Player";

// function App() {
//   return (
//     <div className="App">
//       <div className="Main">
//         <LeftSideBar />
//         <MainPage />
//       </div>
//       <div className="Player">{/* <Player /> */}</div>
//     </div>
//   );
// }

// export default App;

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
