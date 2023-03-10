import React, { useState, useEffect } from "react";
import "./mainPage.css";
import Search from "../../assets/white-magnifying-glass-icon-png-14.jpg";
import axios from "axios";
import useAuth from "../useAuth/useAuth";
import SpotifyWebApi from "spotify-web-api-node";

// const spotifyApi = new SpotifyWebApi({
//   clientId: "33665286bad84fc388bdc384fc451680",
// });

function Main(props) {
  const accessToken = useAuth(props.code);
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

  // useEffect(() => {
  //   if (!accessToken) return;
  //   spotifyApi.setAccessToken(accessToken);
  // }, [accessToken]);

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

// import React, { useState, useEffect } from "react";
// import "./mainPage.css";
// import Search from "../../assets/white-magnifying-glass-icon-png-14.jpg";
// import useAuth from "../useAuth/useAuth";
// import SpotifyWebApi from "spotify-web-api-node";
// import { PlayCircle } from "react-feather";
// import axios from "axios";

// const spotifyApi = new SpotifyWebApi({
//   clientId: "33665286bad84fc388bdc384fc451680",
// });

// function Main(props) {
//   const accessToken = useAuth(props.code);
//   const [inputValue, setInputValue] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [songs, setSongs] = useState("");

//   const handleChangeInput = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleKeyDown = async (event) => {
//     if (inputValue === "") return;
//     if (event.key === "Enter") {
//       try {
//         const response = await axios.post("http://localhost:8080/songs", {
//           mood: inputValue,
//         });
//         setSongs(response.data.songs);
//         const resResponse = await response.data.songs.map((song) => {
//           spotifyApi.searchTracks(song, { limit: 1 });
//         });
//         setSearchResults(resResponse.body.tracks.items);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const handleClear = () => {
//     setInputValue("");
//     setSearchResults([]);
//   };

//   const handlePlaySong = (uri) => {
//     spotifyApi.play({ uris: [uri] }).catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     if (!accessToken) return;
//     spotifyApi.setAccessToken(accessToken);
//   }, [accessToken]);

//   return (
//     <div className="main-content">
//       <div className="top-bar">
//         <div className="mood-input">
//           <img src={Search} alt="" />
//           <input
//             type="text"
//             placeholder="Write your mood"
//             value={inputValue}
//             onChange={handleChangeInput}
//             onKeyDown={handleKeyDown}
//           />
//           <span className="close" onClick={handleClear}>
//             &times;
//           </span>
//         </div>
//         <div className="buttons">
//           <button>Home</button>
//           <button>Browse</button>
//           <button>Radio</button>
//         </div>
//       </div>
//       {searchResults.length > 0 && (
//         <div className="content">
//           <h2>Related to your mood: {inputValue}</h2>
//           <ul>
//             {searchResults.map((result) => (
//               <li key={result.id}>
//                 {result.name} -{" "}
//                 {result.artists.map((artist) => artist.name).join(", ")}
//                 <PlayCircle onClick={() => handlePlaySong(result.uri)} />
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Main;
