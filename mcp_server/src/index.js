// import { createMcpExpressApp } from "@modelcontextprotocol/express";
import { createServer } from "node:http";
import {
  toNodeHandler,
  validateHost,
  validateOrigin,
} from "@modelcontextprotocol/node";
import handler from "./mcp.js";

// const app = createMcpExpressApp({
//   host: "127.0.0.1",
// });

const nodeHandler = toNodeHandler(handler);
const validateHost = localhostHostValidation();
const validateOrigin = localhostOriginValidation();

const httpServer = createServer((request, response) => {
  if (!validateHost(request, response)) return;

  if (!validateOrigin(request, response)) return;

  void nodeHandler(request, response);
});

httpServer.listen(8081, "127.0.0.1", () => {
  console.log("Task MCP server is running at http://127.0.0.1:8081/mcp");
});

// app.all("/mcp", (request, response) => {
//   if (!validateHost(request, response)) return;
//   if (!validateOrigin(request, response)) return;
//   void nodeHandler(request, response, request.body);
// });

// const httpServer = app.listen(8081, "127.0.0.1", () => {
//   console.log("Task MCP server running at http://localhost:8081/mcp");
// });
