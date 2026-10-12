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
