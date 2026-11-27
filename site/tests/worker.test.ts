import { describe, it, expect } from "bun:test";
import { readFileSync } from "fs";
import { join } from "path";
import {
  parseAccept,
  shouldServeMarkdown,
  jsonApiError,
  jsonApiOk,
  handleApi,
  handleModel,
  handleCompareViews,
  handleValidateMesh,
  handleListSkills,
  handleInspectAnatomy,
  jsonRpcError,
  jsonRpcResult,
  handleMcp,
} from "../src/worker";

const ROOT = join(import.meta.dir, "..");

function read(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function parseJson<T = unknown>(body: string): T {
  return JSON.parse(body) as T;
}

describe("OpenAPI specification", () => {
  it("openapi.json exists and is valid JSON", () => {
    const spec = parseJson(read("public/openapi.json"));
    expect(spec.openapi).toBe("3.0.3");
    expect(spec.info.title).toBe("ReShape API");
    expect(spec.info.description).toContain("Blender");
    expect(spec.servers[0].url).toBe("https://reshape.eduardoaugusto.work");
  });

  it("every operation has operationId, description, and typed parameters", () => {
    const spec = parseJson(read("public/openapi.json"));
    for (const [path, item] of Object.entries(spec.paths as Record<string, unknown>)) {
      for (const [method, op] of Object.entries(item as Record<string, unknown>)) {
        const operation = op as { operationId?: string; description?: string; parameters?: unknown[] };
        expect(operation.operationId, `${method.toUpperCase()} ${path}`).toBeDefined();
        expect(operation.description, `${method.toUpperCase()} ${path}`).toBeDefined();
        expect(typeof operation.operationId).toBe("string");
        expect(typeof operation.description).toBe("string");
      }
    }
    // Specific expected operations
    expect(spec.paths["/api/model"].post.operationId).toBe("reshape_model");
    expect(spec.paths["/api/compare-views"].post.operationId).toBe("reshape_compare_views");
    expect(spec.paths["/api/validate-mesh"].post.operationId).toBe("reshape_validate_mesh");
    expect(spec.paths["/api/list-skills"].get.operationId).toBe("reshape_list_skills");
    expect(spec.paths["/api/inspect-anatomy"].get.operationId).toBe("reshape_inspect_anatomy");
  });

  it("defines response schemas and error schema", () => {
    const spec = parseJson(read("public/openapi.json"));
    expect(spec.components.schemas.ErrorResponse).toBeDefined();
    expect(spec.components.schemas.ErrorResponse.required).toContain("error");
    expect(spec.components.schemas.ModelResponse).toBeDefined();
    expect(spec.components.schemas.CompareViewsResponse).toBeDefined();
  });
});

describe("content negotiation", () => {
  it("serves Markdown for text/markdown only", () => {
    expect(shouldServeMarkdown("text/markdown")).toBe(true);
  });
  it("serves HTML for text/html only", () => {
    expect(shouldServeMarkdown("text/html")).toBe(false);
  });
  it("prefers Markdown when q is higher", () => {
    expect(shouldServeMarkdown("text/markdown; q=1.0, text/html; q=0.5")).toBe(true);
  });
  it("parseAccept sorts by quality descending", () => {
    const entries = parseAccept("text/html; q=0.5, text/markdown; q=1.0");
    expect(entries[0].type).toBe("text/markdown");
    expect(entries[1].type).toBe("text/html");
  });
});

describe("JSON API error responses", () => {
  it("jsonApiError returns structured JSON with code, message, hint, status", async () => {
    const res = jsonApiError("invalid_request", "bad input", 400, "fix this");
    expect(res.status).toBe(400);
    expect(res.headers.get("Content-Type")).toContain("application/json");
    const body = parseJson(await res.text());
    expect(body.error.code).toBe("invalid_request");
    expect(body.error.message).toBe("bad input");
    expect(body.error.hint).toBe("fix this");
    expect(body.error.status).toBe(400);
  });

  it("jsonApiOk returns JSON with content-type application/json", async () => {
    const res = jsonApiOk({ status: "ok" });
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("application/json");
    const body = parseJson(await res.text());
    expect(body.status).toBe("ok");
  });

  it("handleModel returns 400 JSON error for missing brief", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/api/model", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await handleModel(req);
    expect(res.status).toBe(400);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe("invalid_request");
    expect(body.error.hint).toContain("brief");
  });

  it("handleModel returns 200 JSON for valid request", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/api/model", {
      method: "POST",
      body: JSON.stringify({ brief: "a vase", pass: "blockout" }),
    });
    const res = await handleModel(req);
    expect(res.status).toBe(200);
    const body = parseJson(await res.text());
    expect(body.status).toBe("ok");
    expect(body.pass).toBe("blockout");
  });

  it("handleCompareViews returns 400 for empty views", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/api/compare-views", {
      method: "POST",
      body: JSON.stringify({ views: [] }),
    });
    const res = await handleCompareViews(req);
    expect(res.status).toBe(400);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe("invalid_request");
  });

  it("handleValidateMesh returns 400 for invalid targetUse", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/api/validate-mesh", {
      method: "POST",
      body: JSON.stringify({ targetUse: "nonsense" }),
    });
    const res = await handleValidateMesh(req);
    expect(res.status).toBe(400);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe("invalid_request");
  });

  it("reports the mesh as unverified when no Blender scene is available", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/api/validate-mesh", {
      method: "POST",
      body: JSON.stringify({ targetUse: "real-time" }),
    });
    const res = await handleValidateMesh(req);
    expect(await res.json()).toMatchObject({
      status: "unverified",
      manifold: null,
      triangleCount: null,
    });
  });

  it("handleListSkills returns 400 for invalid category", async () => {
    const req = new Request(
      "https://reshape.eduardoaugusto.work/api/list-skills?category=nope",
      { method: "GET" },
    );
    const res = await handleListSkills(req);
    expect(res.status).toBe(400);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe("invalid_request");
  });

  it("handleListSkills returns skills for valid category", async () => {
    const req = new Request(
      "https://reshape.eduardoaugusto.work/api/list-skills?category=anatomy",
      { method: "GET" },
    );
    const res = await handleListSkills(req);
    expect(res.status).toBe(200);
    const body = parseJson(await res.text());
    expect(body.category).toBe("anatomy");
    expect(Array.isArray(body.skills)).toBe(true);
  });

  it("handleInspectAnatomy returns 400 for missing region", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/api/inspect-anatomy", {
      method: "GET",
    });
    const res = await handleInspectAnatomy(req);
    expect(res.status).toBe(400);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe("invalid_request");
  });

  it("handleApi routes unknown path to 404 JSON error", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/api/unknown", {
      method: "GET",
    });
    const res = await handleApi("/api/unknown", req);
    expect(res.status).toBe(404);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe("not_found");
  });
});

describe("MCP Streamable HTTP server", () => {
  it("initialize returns protocolVersion, capabilities, serverInfo", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {},
      }),
    });
    const res = await handleMcp(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("application/json");
    const body = parseJson(await res.text());
    expect(body.jsonrpc).toBe("2.0");
    expect(body.id).toBe(1);
    expect(body.result.protocolVersion).toBe("2025-03-26");
    expect(body.result.capabilities.tools).toBeDefined();
    expect(body.result.serverInfo.name).toBe("reshape-mcp-server");
  });

  it("tools/list returns the tool catalog", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" }),
    });
    const res = await handleMcp(req);
    const body = parseJson(await res.text());
    expect(body.id).toBe(2);
    expect(Array.isArray(body.result.tools)).toBe(true);
    expect(body.result.tools.length).toBeGreaterThan(0);
    const names = body.result.tools.map((t: { name: string }) => t.name);
    expect(names).toContain("reshape_model");
    expect(names).toContain("reshape_validate_mesh");
  });

  it("tools/call dispatches to known tools", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "reshape_validate_mesh", arguments: { targetUse: "3d-printing" } },
      }),
    });
    const res = await handleMcp(req);
    const body = parseJson(await res.text());
    expect(body.id).toBe(3);
    expect(body.result).toMatchObject({
      status: "unverified",
      manifold: null,
      triangleCount: null,
    });
  });

  it("unknown method returns JSON-RPC error -32601", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 4,
        method: "does/not/exist",
      }),
    });
    const res = await handleMcp(req);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe(-32601);
  });

  it("invalid JSON returns parse error -32700", async () => {
    const req = new Request("https://reshape.eduardoaugusto.work/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const res = await handleMcp(req);
    const body = parseJson(await res.text());
    expect(body.error.code).toBe(-32700);
  });
});

describe("built output", () => {
  it("docs page is linked from homepage", () => {
    const html = read("out/index.html");
    expect(html).toContain('href="/docs/"');
    expect(html).toContain("Documentation");
  });

  it("openapi.json is copied to output root", () => {
    const spec = parseJson(read("out/openapi.json"));
    expect(spec.openapi).toBe("3.0.3");
  });
});
