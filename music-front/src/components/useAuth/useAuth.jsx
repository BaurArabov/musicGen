import { useState, useEffect } from "react";
import axios from "axios";

function useAuth(code) {
  const [expiresIn, setExpiresIn] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  //every time when access token expires in some time update it
  useEffect(() => {
    axios
      .post("http://localhost:8080/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        setExpiresIn(61);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8080/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.access_token);
          setExpiresIn(61);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}

export default useAuth;
