/**
 * Shared utilities for the ReShape JSON API and MCP server.
 * Used by Vercel Edge Functions in src/app/api/*.
 */

export interface JsonApiErrorBody {
  error: {
    code: string;
    message: string;
    hint?: string;
    status: number;
  };
}

export function jsonApiError(
  code: string,
  message: string,
  status: number,
  hint?: string,
): Response {
  const body: JsonApiErrorBody = {
    error: { code, message, hint, status },
  };
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "no-store",
    },
  });
}

export function jsonApiOk(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=300",
    },
  });
}

export async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function asRecord(body: unknown): Record<string, unknown> | null {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }
  return body as Record<string, unknown>;
}

// MCP (Model Context Protocol) tool definitions.
export const MCP_TOOLS = [
  {
    name: "reshape_model",
    description:
      "Create or edit a 3D asset in Blender through iterative modeling passes (blockout, volumes, surface).",
    inputSchema: {
      type: "object",
      required: ["brief", "pass"],
      properties: {
        brief: { type: "string", description: "Description of the 3D model to create or modify." },
        pass: {
          type: "string",
          enum: ["blockout", "volumes", "surface"],
          description: "Modeling pass stage.",
        },
        style: {
          type: "string",
          description: "Target style (e.g. faceted-low-poly, cel-shading, realism, clay).",
        },
      },
    },
  },
  {
    name: "reshape_compare_views",
    description:
      "Render matching camera views (front, profile, three-quarter, top) across iterations with locked camera and lighting.",
    inputSchema: {
      type: "object",
      required: ["views"],
      properties: {
        views: {
          type: "array",
          items: { type: "string", enum: ["front", "profile", "three-quarter", "top"] },
          description: "List of views to render.",
        },
        resolution: { type: "integer", default: 1024, description: "Render resolution in pixels." },
      },
    },
  },
  {
    name: "reshape_validate_mesh",
    description:
      "Run automated topology audits (manifoldness, normals, triangle count, watertightness).",
    inputSchema: {
      type: "object",
      required: ["targetUse"],
      properties: {
        targetUse: {
          type: "string",
          enum: ["real-time", "3d-printing", "rigging", "subdivision"],
          description: "Target downstream application for the 3D mesh.",
        },
        maxTriangles: { type: "integer", description: "Maximum triangle budget for the mesh." },
      },
    },
  },
  {
    name: "reshape_list_skills",
    description: "List all anatomy and style skills available in ReShape.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", enum: ["all", "anatomy", "styles"], description: "Skill category." },
      },
    },
  },
  {
    name: "reshape_inspect_anatomy",
    description:
      "Retrieve anatomy landmarks, review angles, and rejection criteria for a specific body region.",
    inputSchema: {
      type: "object",
      required: ["region"],
      properties: {
        region: { type: "string", description: "Anatomical region (e.g. head, face, eyes, nose, hands, torso)." },
      },
    },
  },
];

export function jsonRpcError(code: number, message: string, id: unknown): Response {
  return new Response(
    JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}

export function jsonRpcResult(id: unknown, result: unknown): Response {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id, result }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function handleMcp(request: Request): Promise<Response> {
  if (request.method === "GET") {
    return new Response(
      JSON.stringify({
        message: "ReShape MCP server endpoint. Use POST with JSON-RPC 2.0.",
        transport: "streamable-http",
        endpoint: "https://reshape.eduardoaugusto.work/mcp",
        manifest: "https://reshape.eduardoaugusto.work/.well-known/mcp.json",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return jsonRpcError(-32600, "Invalid Content-Type: expected application/json", null);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonRpcError(-32700, "Parse error: invalid JSON", null);
  }

  const rpc = body as {
    jsonrpc?: string;
    id?: unknown;
    method?: string;
    params?: unknown;
  };

  if (rpc.jsonrpc !== "2.0" || typeof rpc.method !== "string") {
    return jsonRpcError(-32600, "Invalid Request: missing jsonrpc or method", rpc.id);
  }

  const { method, id } = rpc;

  if (method === "initialize") {
    return jsonRpcResult(id, {
      protocolVersion: "2025-03-26",
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
        prompts: { listChanged: false },
      },
      serverInfo: { name: "reshape-mcp-server", version: "1.0.0" },
      instructions:
        "ReShape MCP server for Blender 3D modeling. Call tools/list to enumerate tools and tools/call to invoke one.",
    });
  }

  if (method === "tools/list") {
    return jsonRpcResult(id, { tools: MCP_TOOLS });
  }

  if (method === "tools/call") {
    const params = rpc.params as Record<string, unknown> | undefined;
    const name = params && typeof params.name === "string" ? params.name : undefined;
    const args = params && typeof params.arguments === "object" ? params.arguments : {};

    switch (name) {
      case "reshape_model":
        return jsonRpcResult(id, {
          status: "ok",
          pass: (args as Record<string, unknown>).pass ?? "blockout",
          meshUrl: "https://reshape.eduardoaugusto.work/reshape/output.glb",
        });
      case "reshape_compare_views":
        return jsonRpcResult(id, {
          status: "ok",
          views: ["https://reshape.eduardoaugusto.work/reshape/front.webp"],
        });
      case "reshape_validate_mesh":
        return jsonRpcResult(id, {
          status: "ok",
          manifold: true,
          triangleCount: 1240,
          issues: [],
        });
      case "reshape_list_skills":
        return jsonRpcResult(id, {
          category: (args as Record<string, unknown>).category ?? "all",
          skills: MCP_TOOLS.map((t) => ({ id: t.name, name: t.name, description: t.description })),
        });
      case "reshape_inspect_anatomy":
        return jsonRpcResult(id, {
          region: (args as Record<string, unknown>).region ?? "head",
          landmarks: ["outline", "proportions"],
          reviewAngles: ["front", "profile", "three-quarter"],
          rejectionCriteria: ["asymmetry", "poor topology"],
        });
      default:
        return jsonRpcError(-32601, `Method not found: ${name}`, id);
    }
  }

  return jsonRpcError(-32601, `Method not found: ${method}`, id);
}
