import React, { useState, useEffect } from "react";
import "./mainPage.css";
import Search from "../../assets/white-magnifying-glass-icon-png-14.jpg";
import axios from "axios";
import useAuth from "../useAuth/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Player from "../Player/Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "33665286bad84fc388bdc384fc451680",
});

function Main(props) {
  const accessToken = useAuth(props.code);

  const [songs, setSongs] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [uri, setUri] = useState([]);
  const [currentSongUri, setCurrentSongUri] = useState("");

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (inputValue === "") return;
    if (event.key === "Enter") {
      const response = await axios.post("http://localhost:8080/songs", {
        mood: inputValue,
      });

      const songs = response.data.songs.map((song) => ({
        id: song.id,
        name: song.songName,
        artist: song.artist,
        uri: "",
      }));

      setSongs(songs);

      try {
        const promises = songs.map((song) =>
          axios.get(
            `https://api.spotify.com/v1/search?q=track:${song.name} artist:${song.artist}&type=track`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
        );
        const responses = await Promise.all(promises);

        const uris = responses
          .map((response, index) => {
            const uri = response.data.tracks.items[0]?.uri;
            if (uri) {
              songs[index].uri = uri;
            }
            return uri;
          })
          .filter(Boolean);

        setUri(uris);
        setSearchResults(
          responses.map((response) => response.data.tracks.items)
        );
        setSongs(songs);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleClear = () => {
    setInputValue("");
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleCurrSong = (uri) => {
    setCurrentSongUri(uri);
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
      {songs !== "" ? (
        <div className="content">
          <div style={{ display: "flex", gap: "10px" }}>
            <h2 style={{ color: "white" }}>Related to your mood: </h2>{" "}
            <h2 style={{ color: "red" }}>{inputValue}</h2>
          </div>

          <List
            className="list-songs"
            style={{ overflowY: "scroll", height: "430px" }}
          >
            {songs.map((song) => (
              <ListItem key={song.id} disablePadding>
                <ListItemButton onClick={() => handleCurrSong(song.uri)}>
                  {song.uri !== "" ? (
                    <ListItemText
                      primary={`${song.name} - ${song.artist}.`}
                      style={{ color: "white" }}
                    />
                  ) : (
                    <ListItemText
                      primary={`${song.name} - ${song.artist}`}
                      style={{ color: "white" }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      ) : songs === undefined ? (
        <h1>Try again...</h1>
      ) : (
        <></>
      )}
      <div className="spot-player">
        <Player
          accessToken={accessToken}
          trackUri={currentSongUri}
          style={{
            sliderColor: "red",
            trackNameColor: "black",
            trackArtistColor: "black",
          }}
          songs={songs}
        />
      </div>
    </div>
  );
}

export default Main;
