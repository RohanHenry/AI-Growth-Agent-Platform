import { NextResponse } from "next/server";
import { generateLandingPage } from "@/lib/ai/generate";
import { landingPageInputSchema } from "@/lib/schemas/landing-page";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const input = landingPageInputSchema.parse(json);
    const generated = await generateLandingPage(input);

    return NextResponse.json({ generated });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate landing page strategy.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}