import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile("tarot.html", { root: "." });
});

app.post("/api/tarot", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    res.json({
      text: response.output_text
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("心結びタロット server running: http://localhost:3000");
});