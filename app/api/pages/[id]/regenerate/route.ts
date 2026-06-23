import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateLandingPage } from "@/lib/ai/generate";
import { sectionPromptTemplates, type RegeneratableSection } from "@/lib/ai/prompts";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { section } = (await request.json()) as { section?: RegeneratableSection };

    if (!section || !(section in sectionPromptTemplates)) {
      return NextResponse.json({ error: "Invalid section." }, { status: 400 });
    }

    const page = await prisma.landingPage.findUnique({ where: { id } });
    if (!page) {
      return NextResponse.json({ error: "Landing page not found." }, { status: 404 });
    }

    const generated = await generateLandingPage({
      companyName: page.companyName,
      websiteUrl: page.websiteUrl,
      industry: page.industry,
      targetAudience: page.targetAudience,
      productDescription: page.productDescription,
      businessGoal: `${page.businessGoal}. ${sectionPromptTemplates[section]}`,
      toneOfVoice: page.toneOfVoice,
      ctaGoal: page.ctaGoal
    });

    const data =
      section === "hero"
        ? {
            heroHeadline: generated.heroHeadline,
            heroSubheading: generated.heroSubheading,
            ctaText: generated.ctaText
          }
        : section === "seo"
          ? {
              seoTitle: generated.seoTitle,
              metaDescription: generated.metaDescription
            }
          : section === "faq"
            ? { faqs: generated.faqs }
            : section === "benefits"
              ? { benefits: generated.benefits }
              : { personalizationIdeas: generated.personalizationIdeas };

    await prisma.landingPage.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to regenerate section.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
