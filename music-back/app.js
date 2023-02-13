import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.status(200).send("Hi");
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    // const prompt = "give me some summer vibe songs";

    const response = await openai.createCompletion({
      model: "text-babbage-001",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      answer: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(8080, () => {
  console.log("Server is listenning");
});
