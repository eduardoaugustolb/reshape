import { NextResponse } from "next/server";
import { jsonApiError, jsonApiOk } from "@/lib/api";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
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
