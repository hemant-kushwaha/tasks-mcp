import * as z from "zod/v4";

import { createTask, listTasks, completeTask } from "./tasks.js";

export function registerTaskTools(server) {
  server.registerTool(
    "create_task",
    {
      description: "Create a new task",
      inputSchema: z.object({
        title: z.string().min(1),
      }),
    },
    async ({ title }) => ({
      content: [{ type: "text", text: createTask(title) }],
    }),
  );

  server.registerTool(
    "list_tasks",
    {
      description: "List all pending tasks",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [{ type: "text", text: listTasks() }],
    }),
  );

  server.registerTool(
    "complete_task",
    {
      description: "Complete a task using its exact title",
      inputSchema: z.object({
        title: z.string().min(1),
      }),
    },
    async ({ title }) => ({
      content: [{ type: "text", text: completeTask(title) }],
    }),
  );
}
