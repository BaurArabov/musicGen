import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

function Player({ accessToken, trackUri, styles }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  const handlePlay = () => {
    setPlay(!play);
  };

  const handleEnd = () => {
    setPlay(false);
  };

  return (
    <div>
      <SpotifyPlayer
        token={accessToken}
        uris={trackUri ? [trackUri] : "spotify:track:6lEBtO2UwVILU8B0H23msN"}
        play={play}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        styles={styles}
        showSaveIcon
        showPlayIcon
        autoPlay
        magnifySliderOnHover
        playIcon={<span>&#9654;</span>}
        pauseIcon={<span>&#10074;&#10074;</span>}
        onPlay={() => handlePlay()}
        onReady={() => handlePlayerReady()}
        onEnd={() => handleEnd()}
      />
    </div>
  );
}

export default Player;
