import { NextResponse } from "next/server";
import { jsonApiError, jsonApiOk, readJsonBody, asRecord } from "@/lib/api";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
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
