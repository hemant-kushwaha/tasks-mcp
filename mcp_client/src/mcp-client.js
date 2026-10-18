import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";

const mcpClient = new Client({
  name: "task-mcp-client",
  version: "1.0.0",
});

const transport = new StreamableHTTPClientTransport(
  new URL(process.env.MCP_SERVER_URL ?? "http://localhost:8081/mcp"),
);

export async function connectMcp() {
  await mcpClient.connect(transport);

  console.log("Connected to Task MCP Server");
}

export async function getGeminiTools() {
  const { tools } = await mcpClient.listTools();

  return tools.map((tool) => ({
    type: "function",
    name: tool.name,
    description: tool.description ?? "",
    parameters: tool.inputSchema,
  }));
}

export async function callMcpTool(name, args) {
  return await mcpClient.callTool({
    name,
    arguments: args,
  });
}

export async function readTaskGuidelines() {
  const result = await mcpClient.readResource({
    uri: "task://guidelines",
  });

  return result.contents.map((content) => content.text ?? "").join("\n");
}
export async function getPlanDayPrompt(hours) {
  const result = await mcpClient.getPrompt({
    name: "plan_day",
    arguments: {
      availableHours: String(hours),
    },
  });

  return result.messages
    .map((message) => {
      const content = message.content;
      return content.type === "text" ? content.text : "";
    })
    .join("\n");
}
