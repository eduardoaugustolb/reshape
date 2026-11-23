import { NextResponse } from "next/server";
import { jsonApiError, jsonApiOk, readJsonBody, asRecord } from "@/lib/api";

export async function POST(request: Request): Promise<Response> {
  const body = asRecord(await readJsonBody(request));
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

export async function GET(): Promise<Response> {
  return jsonApiError("method_not_allowed", "Use POST to create or edit a 3D asset.", 405);
}
