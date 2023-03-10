import React, { useState, useEffect } from "react";
import "./index.css";
import Search from "../../assets/white-magnifying-glass-icon-png-14.jpg";
import axios from "axios";

function Main() {
  const [songs, setSongs] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChangeInput = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (event) => {
    console.log(songs);
    if (inputValue === "") return;
    if (event.key === "Enter") {
      const response = await axios.post("http://localhost:8080/songs", {
        mood: inputValue,
      });
      setSongs(response.data.songs);
    }
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="mood-input">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="Write your mood"
            value={inputValue}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
          <span className="close" onClick={handleClear}>
            &times;
          </span>
        </div>
        <div className="buttons">
          <button>Home</button>
          <button>Browse</button>
          <button>Radio</button>
        </div>
      </div>
      {songs !== "" && (
        <div className="content">
          <h2>Related to your mood: {inputValue}</h2>
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {song.songName} - {song.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Main;
