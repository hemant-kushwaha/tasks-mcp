import { GoogleGenAI } from "@google/genai";
import { getGeminiTools, callMcpTool } from "./mcp-client.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";

export async function askGemini(message) {
  const tools = await getGeminiTools();

  let input = message;
  let interactionId;

  while (true) {
    // 1. Ask Gemini what to do
    const interaction = await ai.interactions.create({
      model,
      input,
      tools,
      previous_interaction_id: interactionId || undefined,
    });

    // Save the ID of this interaction
    interactionId = interaction.id;

    const functionResults = [];

    // 2. Execute requested MCP tools
    for (const step of interaction.steps ?? []) {
      if (step.type !== "function_call") continue;

      let result;

      try {
        result = await callMcpTool(step.name, step.arguments);
      } catch (error) {
        console.error("MCP tool error:", error);
        result = { error: error.message };
      }

      // 3. Prepare the tool result for Gemini
      functionResults.push({
        type: "function_result",
        name: step.name,
        call_id: step.id,
        result: [
          {
            type: "text",
            text: typeof result === "string" ? result : JSON.stringify(result),
          },
        ],
      });
    }

    // 4. No tool calls means Gemini has finished
    if (functionResults.length === 0) {
      return interaction.output_text ?? "";
    }

    // 5. Continue the interaction with tool results
    input = functionResults;
  }
}
