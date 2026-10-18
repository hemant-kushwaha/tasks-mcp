import * as z from "zod/v4";

export function planDay(availableHours) {
  return `Help me plan my pending tasks for today.

First check my current pending tasks
using the available task tools.

I have ${availableHours} hours available today.

Give me a concise and ordered plan.`;
}

export function registerTaskPrompts(server) {
  server.registerPrompt(
    "plan_day",
    {
      description: "Plan pending tasks for the available time",
      argsSchema: z.object({
        availableHours: z.string().describe("Number of hours available today"),
      }),
    },
    ({ availableHours }) => ({
      description: "Plan pending tasks for the day",
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: planDay(availableHours),
          },
        },
      ],
    }),
  );
}
