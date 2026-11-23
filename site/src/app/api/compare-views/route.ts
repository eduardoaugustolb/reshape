import { NextResponse } from "next/server";
import { jsonApiError, jsonApiOk, readJsonBody, asRecord } from "@/lib/api";

export async function POST(request: Request): Promise<Response> {
  const body = asRecord(await readJsonBody(request));
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
    views: (body.views as string[]).map(
      (v) => `https://reshape.eduardoaugusto.work/reshape/${v}.webp`,
    ),
  });
}

export async function GET(): Promise<Response> {
  return jsonApiError("method_not_allowed", "Use POST to render views.", 405);
}
