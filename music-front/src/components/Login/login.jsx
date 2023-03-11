import Button from "@mui/material/Button";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f1852176c62742a9b025224b84f0506f" +
  "&response_type=code&redirect_uri=http://localhost:5173" +
  "&scope=streaming" +
  "%20user-read-email" +
  "%20user-read-private" +
  "%20user-library-read" +
  "%20user-library-modify" +
  "%20user-read-playback-state" +
  "%20user-modify-playback-state";

export default function Login() {
  return (
    <div className="login-btn">
      <Button
        variant="contained"
        color="success"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        href={AUTH_URL}
      >
        Login with Spotify
      </Button>
    </div>
  );
}
