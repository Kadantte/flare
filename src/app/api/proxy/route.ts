import { ERROR_MESSAGES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ERROR_MESSAGES_BY_STATUS: Record<number, string> = {
  400: ERROR_MESSAGES.BAD_REQUEST,
  500: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  503: ERROR_MESSAGES.SERVICE_UNAVAILABLE,
};

function createErrorResponse(status: number) {
  const message = ERROR_MESSAGES_BY_STATUS[status];

  if (!message) {
    console.warn(`[Proxy] Unhandled status code: ${status}`);
  }

  return NextResponse.json(
    { error: message || ERROR_MESSAGES.UNEXPECTED_ERROR },
    { status }
  );
}

export async function GET(request: NextRequest) {
  if (!API_URL) {
    console.error("[Proxy] API_URL environment variable is not configured");
    return createErrorResponse(503);
  }

  try {
    const targetUrl = new URL(API_URL);
    request.nextUrl.searchParams.forEach((value, key) =>
      targetUrl.searchParams.append(key, value)
    );

    const response = await fetch(targetUrl.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `[Proxy] External API error: ${response.status} ${response.statusText}`
      );

      return createErrorResponse(response.status);
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("[Proxy] Unexpected error:", error);
    return createErrorResponse(503);
  }
}
