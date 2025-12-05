import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/automations", () => {
    return HttpResponse.json([
      { id: 1, name: "Send Welcome Email" },
      { id: 2, name: "Assign Manager" }
    ]);
  }),

  http.post("/simulate", async ({ request }) => {
    // TypeScript-safe parsing
    const body = (await request.json()) as Record<string, any> ?? {};
    const nodes = body.nodes ?? [];

    return HttpResponse.json({
      success: true,
      steps: nodes.length,
      message: "Workflow simulation completed"
    });
  }),
];
