import OpenAI from "openai";
import type { GeneratedLandingPage, LandingPageInput } from "@/types/landing-page";
import { generatedLandingPageSchema } from "@/lib/schemas/landing-page";
import { createFallbackGeneration } from "@/lib/ai/fallback";
import { buildGrowthPrompt } from "@/lib/ai/prompts";

function parseJsonPayload(content: string) {
  const trimmed = content.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  return JSON.parse(fenced?.[1] ?? trimmed);
}

export async function generateLandingPage(input: LandingPageInput): Promise<GeneratedLandingPage> {
  if (!process.env.OPENAI_API_KEY) {
    return createFallbackGeneration(input);
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You create structured, practical landing page strategy JSON for SaaS growth teams."
      },
      {
        role: "user",
        content: buildGrowthPrompt(input)
      }
    ]
  });

  const content = response.choices[0]?.message.content;
  if (!content) {
    throw new Error("The AI provider returned an empty response.");
  }

  const parsed = generatedLandingPageSchema.parse(parseJsonPayload(content));
  return parsed;
}
