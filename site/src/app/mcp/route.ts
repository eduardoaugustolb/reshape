import { NextResponse } from "next/server";
import { handleMcp } from "@/lib/api";

export async function GET(request: Request): Promise<Response> {
  return handleMcp(request);
}

export async function POST(request: Request): Promise<Response> {
  return handleMcp(request);
}
