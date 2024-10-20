import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  return new NextResponse(
    JSON.stringify({
      message: "Hello World",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
