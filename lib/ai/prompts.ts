import type { LandingPageInput } from "@/types/landing-page";

export function buildGrowthPrompt(input: LandingPageInput) {
  return `
You are an expert growth strategist, SEO writer, and landing page conversion specialist.

Create a high-converting landing page strategy for:
- Company: ${input.companyName}
- Website: ${input.websiteUrl}
- Industry: ${input.industry}
- Target audience: ${input.targetAudience}
- Product/service: ${input.productDescription}
- Business goal: ${input.businessGoal}
- Tone of voice: ${input.toneOfVoice}
- CTA goal: ${input.ctaGoal}

Return only valid JSON matching this exact TypeScript shape:
{
  "seoTitle": "string under 65 characters",
  "metaDescription": "string under 155 characters",
  "heroHeadline": "string",
  "heroSubheading": "string",
  "ctaText": "string",
  "painPoints": ["string", "string", "string", "string"],
  "benefits": ["string", "string", "string", "string"],
  "faqs": [{"question": "string", "answer": "string"}],
  "variations": [
    {
      "name": "string",
      "audienceSegment": "string",
      "headline": "string",
      "subheading": "string",
      "cta": "string",
      "angle": "string"
    }
  ],
  "personalizationIdeas": [
    {
      "segment": "string",
      "message": "string",
      "offer": "string"
    }
  ]
}

Requirements:
- Write commercially useful copy, not generic filler.
- Include exactly 3 landing page variations.
- Include at least 4 FAQs.
- Tie every recommendation to the audience and business goal.
- Avoid claims that require unsupported proof.
`.trim();
}

export const sectionPromptTemplates = {
  hero: "Regenerate only the hero headline and subheading with sharper conversion intent.",
  seo: "Regenerate only the SEO title and meta description with higher search intent.",
  faq: "Regenerate only the FAQ section with practical buyer objections.",
  benefits: "Regenerate only the benefits with clearer business outcomes.",
  personalization: "Regenerate only the personalization ideas for distinct customer segments."
} as const;

export type RegeneratableSection = keyof typeof sectionPromptTemplates;
