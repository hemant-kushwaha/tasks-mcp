import { McpServer, createMcpHandler } from "@modelcontextprotocol/server";
import { registerTaskTools } from "./tools.js";
import { registerTaskResources } from "./resources.js";
import { registerTaskPrompts } from "./prompts.js";

const handler = createMcpHandler(() => {
  const server = new McpServer({
    name: "task-mcp-server",
    version: "1.0.0",
  });

  registerTaskTools(server);
  registerTaskResources(server);
  registerTaskPrompts(server);

  return server;
});

export default handler;
