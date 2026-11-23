import { NextResponse } from "next/server";
import { jsonApiError, jsonApiOk, readJsonBody, asRecord } from "@/lib/api";

export async function POST(request: Request): Promise<Response> {
  const body = asRecord(await readJsonBody(request));
  if (
    !body ||
    !["real-time", "3d-printing", "rigging", "subdivision"].includes(
      String(body.targetUse ?? ""),
    )
  ) {
    return jsonApiError(
      "invalid_request",
      "The 'targetUse' field is required and must be one of: real-time, 3d-printing, rigging, subdivision.",
      400,
      "Set targetUse to a valid downstream application.",
    );
  }
  return jsonApiOk({
    status: "ok",
    manifold: true,
    triangleCount: 1240,
    issues: [],
  });
}

export async function GET(): Promise<Response> {
  return jsonApiError("method_not_allowed", "Use POST to validate a mesh.", 405);
}
