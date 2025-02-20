import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ERROR_MESSAGES = {
  SERVICE_UNAVAILABLE:
    "Oops! We're having some issues. Please try again in a moment.",
  BAD_REQUEST:
    "Something went wrong with your request. Try refreshing the page.",
  FAILED_TO_LOAD: "Unable to load images right now. Please try again.",
} as const;

function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function getErrorMessageByStatus(status: number): string {
  switch (status) {
    case 400:
      return ERROR_MESSAGES.BAD_REQUEST;
    case 503:
      return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
    default:
      return ERROR_MESSAGES.FAILED_TO_LOAD;
  }
}

export async function GET(request: NextRequest) {
  if (!API_URL) {
    console.error("[Proxy] API_URL environment variable is not configured");
    return createErrorResponse(ERROR_MESSAGES.SERVICE_UNAVAILABLE, 503);
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

      return createErrorResponse(
        getErrorMessageByStatus(response.status),
        response.status
      );
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("[Proxy] Unexpected error:", error);
    return createErrorResponse(ERROR_MESSAGES.SERVICE_UNAVAILABLE, 503);
  }
}
