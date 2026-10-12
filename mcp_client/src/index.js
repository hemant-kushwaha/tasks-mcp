import "dotenv/config";
import express from "express";

import { connectMcp } from "./mcp-client.js";
import { askGemini } from "./agent.js";

// Connect before accepting user requests
await connectMcp();

const app = express();
app.use(express.json());

app.get("/ask", async (request, response) => {
  const { message } = request.body;
  try {
    const answer = await askGemini(message);
    return response.send(answer);
  } catch (error) {
    console.error(error);

    return response.status(500).send("Unable to process the request");
  }
});

app.listen(8080, "127.0.0.1", () => {
  console.log("Task client running at http://localhost:8080");
});
