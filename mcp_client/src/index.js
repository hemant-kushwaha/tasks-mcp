import "dotenv/config";
import express from "express";

import { connectMcp } from "./mcp-client.js";
import { chat, planDay } from "./agent.js";

// Connect before accepting user requests
await connectMcp();

const app = express();
app.use(express.json());

app.get("/ask", async (req, res) => {
  const { message } = req.query;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).send("Query parameter 'message' is required.");
  }

  try {
    const answer = await chat(message);
    return res.send(answer);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Unable to process the request.");
  }
});

app.get("/plan", async (req, res) => {
  const { hours } = req.query;

  if (typeof hours !== "string" || !hours.trim()) {
    return res.status(400).send("Query parameter 'hours' is required.");
  }

  try {
    const answer = await planDay(hours);
    return res.send(answer);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Unable to plan your day.");
  }
});

app.listen(8080, "127.0.0.1", () => {
  console.log("Task client running at http://localhost:8080");
});
