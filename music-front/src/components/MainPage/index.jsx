import React, { useState } from "react";
import "./index.css";
import Search from "../../assets/white-magnifying-glass-icon-png-14.jpg";

function Main() {
  let songsData = [
    {
      id: 1,
      name: "Summertime",
      artist: "Katrina and the Waves",
    },
    {
      id: 2,
      name: "Can't Stop the Feeling!",
      artist: "Justin Timberlake",
    },
    {
      id: 3,
      name: "The Dance",
      artist: "Bon Iver",
    },
  ];

  // const [searchTerm, setSearchTerm] = useState("");
  // const [songs, setSongs] = useState([]);

  // const handleSearch = async (event) => {
  //   if (event.key === "Enter") {
  //     const response = await fetch("http://localhost:8080/");
  //     const data = await response.json();
  //     const filteredSongs = data.filter(
  //       (song) =>
  //         song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setSongs(filteredSongs);
  //   }
  // };

  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="mood-input">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="Write your mood"
            // onKeyPress={handleSearch}
            // onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <button>Home</button>
          <button>Browse</button>
          <button>Radio</button>
        </div>
      </div>
      <div className="content">
        <ul>
          {songsData.map((song) => (
            <li key={song.id}>
              {song.name} - {song.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
