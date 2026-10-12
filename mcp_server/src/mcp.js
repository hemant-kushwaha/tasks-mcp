import { McpServer, createMcpHandler } from "@modelcontextprotocol/server";
import { registerTaskTools } from "./tools.js";

const handler = createMcpHandler(() => {
  const server = new McpServer({
    name: "task-mcp-server",
    version: "1.0.0",
  });

  registerTaskTools(server);

  return server;
});

export default handler;
