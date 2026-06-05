import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const apiResponse = await fetch(`${BACKEND_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await apiResponse.json();
    return NextResponse.json(data, { status: apiResponse.status });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
