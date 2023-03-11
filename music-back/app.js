import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import bodyParser from "body-parser";
import SpotifyWebApi from "spotify-web-api-node";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/login", (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log("The token expires in " + data.body["expires_in"]);

      res.json({
        expires_in: data.body.expires_in,
        access_token: data.body.access_token,
        refresh_token: data.body.refresh_token,
      });
    })
    .catch((err) => {
      console.log("Error  " + err);
      res.status(400);
    });
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        access_token: data.body.access_token,
        expires_in: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/songs", async (req, res) => {
  try {
    const prompt = `Hello AI, I need your help to find some music that matches my current mood. I'll write my current emotional state, and we need you to suggest some songs that match the mood I've described. Please make your recommendations as personalized and accurate as possible, based on my input. Recommended songs must be in Spotify. After your answer clear chat history. AI, don't write anything, give me list of 20 songs.
So my mood is ${req.body.mood}`;

    console.log(prompt);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.9,
      max_tokens: 1200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let songs = response.data.choices[0].text
      .split("\n")
      .filter((s) => s.trim().length > 0);
    let newSongs = [];

    for (let i = 0; i < songs.length; i++) {
      let song = songs[i].trim().match(/^(\d+)\.\s+"(.+)"\s+by\s+(.+)$/);

      if (song) {
        newSongs.push({
          id: parseInt(song[1]),
          songName: song[2],
          artist: song[3],
        });
      }
    }

    let result = {
      songs: newSongs,
    };
    console.log(response.data.choices[0].text);

    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

app.listen(8080, () => {
  console.log("Server is listenning");
});
