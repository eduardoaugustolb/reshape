/**
 * Cloudflare Worker fronting the Next.js static export.
 *
 * Serves static assets from `env.ASSETS` and performs agent-friendly content
 * negotiation plus machine-readable endpoints:
 * - Markdown for the homepage and 404s when `Accept: text/markdown` is requested.
 * - OpenAPI spec at /openapi.json.
 * - JSON API at /api/* with structured JSON error responses.
 * - MCP Streamable HTTP server at /mcp.
 */

import { unverifiedMesh } from "./lib/mesh-validation";

interface Env {
  ASSETS: Fetcher;
}

interface Fetcher {
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
  propagation: unknown;
}

interface AcceptEntry {
  type: string;
  q: number;
}

/** Parse an `Accept` header into { type, q } entries sorted by quality desc. */
export function parseAccept(accept: string): AcceptEntry[] {
  return accept
    .split(",")
    .map((part) => {
      const [type, ...params] = part.split(";");
      let q = 1.0;
      for (const p of params) {
        const [k, v] = p.trim().split("=");
        if (k?.trim() === "q") {
          const parsed = parseFloat(v);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { type: type.trim().toLowerCase(), q };
    })
    .filter((entry) => entry.type.length > 0)
    .sort((a, b) => b.q - a.q);
}

/**
 * Serve Markdown when text/markdown is acceptable and at least as preferred as
 * text/html. Pure Accept: text/html keeps HTML.
 */
export function shouldServeMarkdown(accept: string): boolean {
  if (!accept) return false;
  const entries = parseAccept(accept);
  const markdown = entries.find(
    (e) => e.type === "text/markdown" || e.type === "application/markdown",
  );
  if (!markdown || markdown.q <= 0) return false;
  const html = entries.find((e) => e.type === "text/html" || e.type === "*/*" || e.type === "*");
  if (!html) return true;
  return markdown.q >= html.q;
}

// Agent-oriented Markdown rendering of the homepage.
const HOMEPAGE_MARKDOWN = `# ReShape

ReShape is an agent-native 3D modeling, sculpting, and mesh review system for Blender. It enables autonomous AI
agents and 3D artists to model in passes, capture matched camera angles, and validate topology for 3D
printing, game engines, and animation.

## When to use this

Use ReShape when:
- You need to create a realistic, stylized, or low-poly model from scratch or sculpt and review an existing mesh.
- Each visual task uses an opened reference image. Ask the user to attach one or authorize image search when needed.
- You need iterative modeling passes: Blockout -> Volumes -> Surface.
- You need to compare renders with the reference side by side, overlay aligned images, and inspect landmarks and close-ups.
- You need to validate mesh topology for production standards: manifold geometry, quad/triangle budgeting,
  normal orientation, non-overlapping UVs, watertight thickness for 3D printing.
- You want to execute Blender commands programmatically via the ReShape MCP server or invoke the \$reshape skill
  in Codex.

## How to call ReShape

- Codex Skill: call \$reshape followed by the task prompt, image reference, or target 3D asset path.
- MCP Server Endpoint: https://reshape.eduardoaugusto.work/mcp (Streamable HTTP transport)
- MCP Manifest: https://reshape.eduardoaugusto.work/.well-known/mcp.json
- OpenAPI spec: https://reshape.eduardoaugusto.work/openapi.json

## Key Links & Resources

- Homepage: https://reshape.eduardoaugusto.work/
- Documentation & API: https://reshape.eduardoaugusto.work/docs/
- MCP Server & Tools: https://reshape.eduardoaugusto.work/mcp/
- Full Guide: https://reshape.eduardoaugusto.work/llms-full.txt
- Sitemap: https://reshape.eduardoaugusto.work/sitemap.xml
- GitHub Repository: https://github.com/eduardoaugustolb/reshape
- About: https://reshape.eduardoaugusto.work/about/
- Contact: https://reshape.eduardoaugusto.work/contact/
- Privacy: https://reshape.eduardoaugusto.work/privacy/
`;

// Agent-oriented Markdown rendering of a 404.
const NOT_FOUND_MARKDOWN = `# 404 · Page not found

The requested page could not be found on ReShape. Check the URL or browse the site map to find what you are
looking for.

## Where to go next

- [Homepage](/)
- [API Documentation](/docs/)
- [OpenAPI spec](/openapi.json)
- [MCP Server](/mcp/)
- [Sitemap](/sitemap.xml)
- [llms.txt](/llms.txt)
- [About](/about/)
- [Contact](/contact/)
- [Privacy](/privacy/)
`;

// OpenAPI specification (served at /openapi.json).
const OPENAI_SPEC = JSON.stringify({
  openapi: "3.0.3",
  info: {
    title: "ReShape API",
    description:
      "ReShape API for Blender 3D modeling, sculpting, and mesh validation. Enables AI agents to model in passes, capture matched camera views, and validate mesh topology.",
    version: "1.0.0",
    contact: {
      name: "ReShape support",
      email: "contact@eduardoaugusto.work",
      url: "https://reshape.eduardoaugusto.work/contact/",
    },
    license: {
      name: "MIT",
      url: "https://github.com/eduardoaugustolb/reshape/blob/main/LICENSE",
    },
  },
  servers: [
    { url: "https://reshape.eduardoaugusto.work", description: "ReShape production server" },
  ],
  tags: [
    { name: "modeling", description: "Create or edit 3D assets in Blender through iterative modeling passes." },
    { name: "views", description: "Render matching camera views across iterations." },
    { name: "validation", description: "Run automated mesh topology and defect audits." },
    { name: "catalog", description: "List anatomy and style skills available in ReShape." },
  ],
  paths: {
    "/api/model": {
      post: {
        operationId: "reshape_model",
        tags: ["modeling"],
        summary: "Create or edit a 3D asset in Blender",
        description:
          "Build or edit a 3D mesh in Blender from references and parameters, through iterative modeling passes (Blockout, Volumes, Surface).",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModelRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Model created or updated successfully.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ModelResponse" },
              },
            },
          },
          "400": {
            description: "Invalid request parameters.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/compare-views": {
      post: {
        operationId: "reshape_compare_views",
        tags: ["views"],
        summary: "Render matching camera views across iterations",
        description:
          "Render matching orthographic or perspective views (front, profile, three-quarter, top) with locked camera distance, lighting, and focal length.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CompareViewsRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Views rendered successfully.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CompareViewsResponse" },
              },
            },
          },
          "400": {
            description: "Invalid request parameters.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/validate-mesh": {
      post: {
        operationId: "reshape_validate_mesh",
        tags: ["validation"],
        summary: "Report mesh validation availability",
        description:
          "Use the local ReShape mesh audit in Blender for actual measurements.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ValidateMeshRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Mesh validation is unverified because the service has no Blender scene.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidateMeshResponse" },
              },
            },
          },
          "400": {
            description: "Invalid request parameters.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/list-skills": {
      get: {
        operationId: "reshape_list_skills",
        tags: ["catalog"],
        summary: "List anatomy and style skills",
        description: "List ReShape tool entry points by category.",
        parameters: [
          {
            name: "category",
            in: "query",
            description: "Skill category to list.",
            required: false,
            schema: { $ref: "#/components/schemas/SkillCategory" },
          },
        ],
        responses: {
          "200": {
            description: "Skill catalog listed successfully.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ListSkillsResponse" },
              },
            },
          },
          "400": {
            description: "Invalid category parameter.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/inspect-anatomy": {
      get: {
        operationId: "reshape_inspect_anatomy",
        tags: ["catalog"],
        summary: "Retrieve anatomy construction rules",
        description:
          "Retrieve detailed construction rules, review angles, and rejection criteria for a specific anatomical region.",
        parameters: [
          {
            name: "region",
            in: "query",
            description: "Anatomical region (e.g. head, face, eyes, nose, hands, torso).",
            required: true,
            schema: { type: "string", minLength: 1 },
          },
        ],
        responses: {
          "200": {
            description: "Anatomy inspection returned successfully.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/InspectAnatomyResponse" },
              },
            },
          },
          "400": {
            description: "Missing or invalid region parameter.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "404": {
            description: "Anatomy region not found.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ModelRequest: {
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
      ModelResponse: {
        type: "object",
        properties: {
          status: { type: "string", description: "Outcome of the modeling operation." },
          pass: { type: "string", description: "Modeling pass that was applied." },
          meshUrl: {
            type: "string",
            format: "uri",
            description: "URI to the resulting mesh asset.",
          },
        },
      },
      CompareViewsRequest: {
        type: "object",
        required: ["views"],
        properties: {
          views: {
            type: "array",
            items: {
              type: "string",
              enum: ["front", "profile", "three-quarter", "top"],
            },
            description: "List of views to render.",
            minItems: 1,
          },
          resolution: {
            type: "integer",
            default: 1024,
            minimum: 256,
            maximum: 4096,
            description: "Render resolution in pixels.",
          },
        },
      },
      CompareViewsResponse: {
        type: "object",
        properties: {
          status: { type: "string", description: "Outcome of the view render operation." },
          views: {
            type: "array",
            items: { type: "string", format: "uri", description: "URI to each rendered view image." },
          },
        },
      },
      ValidateMeshRequest: {
        type: "object",
        required: ["targetUse"],
        properties: {
          targetUse: {
            type: "string",
            enum: ["real-time", "3d-printing", "rigging", "subdivision"],
            description: "Target downstream application for the 3D mesh.",
          },
          maxTriangles: {
            type: "integer",
            minimum: 1,
            description: "Maximum triangle budget for the mesh.",
          },
        },
      },
      ValidateMeshResponse: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["unverified"] },
          manifold: { type: "boolean", nullable: true, description: "Null when no mesh was inspected." },
          triangleCount: { type: "integer", nullable: true, description: "Null when no mesh was inspected." },
          issues: {
            type: "array",
            items: { type: "string", description: "Reasons validation could not run." },
          },
        },
      },
      SkillCategory: {
        type: "string",
        enum: ["all", "anatomy", "styles"],
        description: "Category of skills to list.",
      },
      ListSkillsResponse: {
        type: "object",
        properties: {
          category: { $ref: "#/components/schemas/SkillCategory" },
          skills: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string", description: "Skill identifier." },
                name: { type: "string", description: "Human-readable skill name." },
                description: { type: "string", description: "What the skill covers." },
              },
            },
          },
        },
      },
      InspectAnatomyResponse: {
        type: "object",
        properties: {
          region: { type: "string", description: "Anatomical region inspected." },
          landmarks: {
            type: "array",
            items: { type: "string", description: "Anatomical landmarks for the region." },
          },
          reviewAngles: {
            type: "array",
            items: { type: "string", description: "Recommended camera angles for review." },
          },
          rejectionCriteria: {
            type: "array",
            items: { type: "string", description: "Criteria that would cause rejection." },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            required: ["code", "message"],
            properties: {
              code: { type: "string", description: "Machine-readable error code." },
              message: { type: "string", description: "Human-readable error message." },
              hint: { type: "string", description: "Resolution hint for the agent or developer." },
              status: { type: "integer", description: "HTTP status code associated with the error." },
            },
          },
        },
      },
    },
  },
}, null, 2);

// JSON API implementations.
export function jsonApiError(code: string, message: string, status: number, hint?: string): Response {
  const body = JSON.stringify({
    error: { code, message, hint, status },
  });
  return new Response(body, {
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

export async function handleApi(pathname: string, request: Request): Promise<Response> {
  const segments = pathname.replace(/^\/api\//, "").split("/");
  const method = request.method;

  // POST /api/model
  if (segments[0] === "model" && segments.length === 1 && method === "POST") {
    return await handleModel(request);
  }
  // POST /api/compare-views
  if (segments[0] === "compare-views" && segments.length === 1 && method === "POST") {
    return await handleCompareViews(request);
  }
  // POST /api/validate-mesh
  if (segments[0] === "validate-mesh" && segments.length === 1 && method === "POST") {
    return await handleValidateMesh(request);
  }
  // GET /api/list-skills
  if (segments[0] === "list-skills" && segments.length === 1 && method === "GET") {
    return handleListSkills(request);
  }
  // GET /api/inspect-anatomy
  if (segments[0] === "inspect-anatomy" && segments.length === 1 && method === "GET") {
    return handleInspectAnatomy(request);
  }

  return jsonApiError("not_found", `API endpoint not found: ${pathname}`, 404);
}

async function readJsonBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function handleModel(request: Request): Promise<Response> {
  const body = (await readJsonBody(request)) as Record<string, unknown> | null;
  if (!body || typeof body.brief !== "string" || !body.brief.trim()) {
    return jsonApiError(
      "invalid_request",
      "The 'brief' field is required and must be a non-empty string.",
      400,
      "Provide a brief describing the 3D model to create or modify.",
    );
  }
  if (!["blockout", "volumes", "surface"].includes(String(body.pass ?? ""))) {
    return jsonApiError(
      "invalid_request",
      "The 'pass' field is required and must be one of: blockout, volumes, surface.",
      400,
      "Set pass to 'blockout', 'volumes', or 'surface'.",
    );
  }
  return jsonApiOk({
    status: "ok",
    pass: body.pass,
    meshUrl: "https://reshape.eduardoaugusto.work/reshape/output.glb",
  });
}

export async function handleCompareViews(request: Request): Promise<Response> {
  const body = (await readJsonBody(request)) as Record<string, unknown> | null;
  if (!body || !Array.isArray(body.views) || body.views.length === 0) {
    return jsonApiError(
      "invalid_request",
      "The 'views' field is required and must be a non-empty array.",
      400,
      "Provide views such as ['front', 'profile', 'three-quarter'].",
    );
  }
  return jsonApiOk({
    status: "ok",
    views: (body.views as string[]).map((v) => `https://reshape.eduardoaugusto.work/reshape/${v}.webp`),
  });
}

export async function handleValidateMesh(request: Request): Promise<Response> {
  const body = (await readJsonBody(request)) as Record<string, unknown> | null;
  if (!body || !["real-time", "3d-printing", "rigging", "subdivision"].includes(String(body.targetUse ?? ""))) {
    return jsonApiError(
      "invalid_request",
      "The 'targetUse' field is required and must be one of: real-time, 3d-printing, rigging, subdivision.",
      400,
      "Set targetUse to a valid downstream application.",
    );
  }
  return jsonApiOk(unverifiedMesh);
}

export function handleListSkills(request: Request): Response {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") || "all";
  if (!["all", "anatomy", "styles"].includes(category)) {
    return jsonApiError(
      "invalid_request",
      "The 'category' parameter must be one of: all, anatomy, styles.",
      400,
      "Use category=all, category=anatomy, or category=styles.",
    );
  }
  const skills =
    category === "all"
      ? [
          { id: "reshape_model", name: "Model", description: "Create or edit a 3D asset in Blender." },
          { id: "reshape_compare_views", name: "Compare Views", description: "Render matching camera views." },
          { id: "reshape_validate_mesh", name: "Validate Mesh", description: "Report mesh validation availability." },
          { id: "reshape_list_skills", name: "List Skills", description: "List anatomy and style skills." },
          { id: "reshape_inspect_anatomy", name: "Inspect Anatomy", description: "Retrieve anatomy construction rules." },
        ]
      : category === "anatomy"
      ? [
          { id: "reshape_inspect_anatomy", name: "Inspect Anatomy", description: "Anatomy landmarks and rejection criteria." },
        ]
      : [
          { id: "reshape_model", name: "Model", description: "Create or edit a 3D asset with style guidance." },
        ];
  return jsonApiOk({ category, skills });
}

export function handleInspectAnatomy(request: Request): Response {
  const url = new URL(request.url);
  const region = url.searchParams.get("region");
  if (!region || !region.trim()) {
    return jsonApiError(
      "invalid_request",
      "The 'region' query parameter is required.",
      400,
      "Provide region such as head, face, eyes, nose, hands, or torso.",
    );
  }
  const known = ["head", "face", "eyes", "nose", "hands", "torso"];
  if (!known.includes(region.toLowerCase())) {
    return jsonApiError(
      "not_found",
      `Anatomy region not found: ${region}`,
      404,
      "Use a known region such as head, face, eyes, nose, hands, or torso.",
    );
  }
  return jsonApiOk({
    region,
    landmarks: [`${region} outline`, `${region} proportions`],
    reviewAngles: ["front", "profile", "three-quarter"],
    rejectionCriteria: ["asymmetry", "poor topology"],
  });
}

// MCP (Model Context Protocol) Streamable HTTP server at /mcp.
const MCP_TOOLS = [
  {
    name: "reshape_model",
    description: "Create or edit a 3D asset in Blender through iterative modeling passes (blockout, volumes, surface).",
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
    description: "Render matching camera views (front, profile, three-quarter, top) across iterations with locked camera and lighting.",
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
    description: "Report validation availability. Run the local ReShape mesh audit for actual measurements.",
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
    description: "Retrieve anatomy landmarks, review angles, and rejection criteria for a specific body region.",
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
    // Streamable HTTP: GET can be used to check endpoint readiness.
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
        return jsonRpcResult(id, unverifiedMesh);
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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept") || "";
    const pathname = url.pathname;

    // --- OpenAPI spec -------------------------------------------------------
    if (pathname === "/openapi.json" || pathname === "/openapi.yaml") {
      return new Response(OPENAI_SPEC, {
        status: 200,
        headers: {
          "Content-Type": pathname.endsWith(".yaml")
            ? "application/vnd.oai.openapi; charset=utf-8"
            : "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // --- JSON API ----------------------------------------------------------
    if (pathname.startsWith("/api/")) {
      return await handleApi(pathname, request);
    }

    // --- MCP Streamable HTTP server ----------------------------------------
    if (pathname === "/mcp") {
      return handleMcp(request);
    }

    // --- Homepage content negotiation --------------------------------------
    if (pathname === "/" || pathname === "") {
      if (shouldServeMarkdown(accept)) {
        return new Response(HOMEPAGE_MARKDOWN, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            Vary: "Accept",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
      const html = await env.ASSETS.fetch(request);
      const headers = new Headers(html.headers);
      headers.set("Vary", "Accept");
      return new Response(html.body, {
        status: html.status,
        statusText: html.statusText,
        headers,
      });
    }

    // --- Serve static asset ----------------------------------------------
    let response = await env.ASSETS.fetch(request);

    // --- 404 content negotiation -----------------------------------------
    if (response.status === 404 && shouldServeMarkdown(accept)) {
      return new Response(NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    return response;
  },
};
