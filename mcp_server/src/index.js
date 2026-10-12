import { createMcpExpressApp } from "@modelcontextprotocol/express";
import { toNodeHandler } from "@modelcontextprotocol/node";
import handler from "./mcp.js";

const app = createMcpExpressApp({
  host: "127.0.0.1",
});

const nodeHandler = toNodeHandler(handler);

app.all("/mcp", (request, response) => {
  void nodeHandler(request, response, request.body);
});

const httpServer = app.listen(8081, "127.0.0.1", () => {
  console.log("Task MCP server running at http://localhost:8081/mcp");
});
