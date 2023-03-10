import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.status(200).send("HI");
});

app.post("/songs", async (req, res) => {
  try {
    const prompt = `Hello AI, I need your help to find some music that matches my current mood. I'll write my current emotional state, and we need you to suggest some songs that match the mood I've described. Please make your recommendations as personalized and accurate as possible, based on my input. Recommended songs must be in Spotify. AI, don't write anything, give me list of 20 songs.
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
