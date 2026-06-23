import type { GeneratedLandingPage, LandingPageInput } from "@/types/landing-page";

export function createFallbackGeneration(input: LandingPageInput): GeneratedLandingPage {
  const audience = input.targetAudience.toLowerCase();
  const goal = input.businessGoal.toLowerCase();

  return {
    seoTitle: `${input.companyName} Growth Landing Page Strategy`,
    metaDescription: `Discover how ${input.companyName} helps ${input.targetAudience} reach ${input.businessGoal} with a clearer conversion path.`,
    heroHeadline: `Turn ${input.websiteUrl.replace(/^https?:\/\//, "")} visitors into qualified pipeline`,
    heroSubheading: `${input.companyName} helps ${audience} understand your offer faster, trust the next step, and act on ${goal}.`,
    ctaText: input.ctaGoal || "Start growing now",
    painPoints: [
      "Visitors leave before understanding the core value proposition.",
      "Generic messaging fails to speak to priority buyer segments.",
      "SEO copy attracts traffic without guiding users toward action.",
      "Landing pages are hard to iterate on without clear campaign structure."
    ],
    benefits: [
      "Position the product around measurable customer outcomes.",
      "Match hero copy, benefits, FAQs, and CTAs to buyer intent.",
      "Create segment-specific variations for faster campaign testing.",
      "Give marketing and product teams an editable source of truth."
    ],
    faqs: [
      {
        question: `Who is ${input.companyName} best for?`,
        answer: `${input.companyName} is best suited for ${input.targetAudience} who need a clearer path from website traffic to ${input.businessGoal}.`
      },
      {
        question: "What makes this landing page strategy different?",
        answer: "It connects SEO intent, conversion copy, objections, and segment personalization in one editable campaign plan."
      },
      {
        question: "How should this page be tested?",
        answer: "Start with the primary hero and CTA, then run the three audience variations against paid, organic, and outbound traffic sources."
      },
      {
        question: "What should be measured first?",
        answer: "Track page views, CTA clicks, conversion rate, and qualitative feedback from the highest-fit customer segment."
      }
    ],
    variations: [
      {
        name: "Outcome-first",
        audienceSegment: "Decision makers",
        headline: `Make ${input.businessGoal} easier to achieve`,
        subheading: `A focused landing page for leaders who need confidence before committing budget or team time.`,
        cta: input.ctaGoal,
        angle: "Lead with business impact, proof, and implementation clarity."
      },
      {
        name: "Pain-first",
        audienceSegment: "Active problem owners",
        headline: "Fix the drop-off between traffic and action",
        subheading: "Show buyers exactly why your offer matters, what changes, and what to do next.",
        cta: "See the strategy",
        angle: "Name the current friction and present the product as the practical next step."
      },
      {
        name: "Speed-first",
        audienceSegment: "Growth teams",
        headline: "Launch sharper landing pages without waiting on a full campaign cycle",
        subheading: "Give your team usable copy, SEO assets, FAQs, and testable variants in one workflow.",
        cta: "Generate a variant",
        angle: "Emphasize execution speed, repeatability, and iteration."
      }
    ],
    personalizationIdeas: [
      {
        segment: "First-time visitors",
        message: "Focus on the problem, category, and immediate value.",
        offer: "A concise overview CTA with low commitment."
      },
      {
        segment: "Returning evaluators",
        message: "Highlight differentiation, proof, and implementation details.",
        offer: "A comparison guide or product walkthrough."
      },
      {
        segment: "High-intent buyers",
        message: "Make the business case and remove final objections.",
        offer: "A demo, consultation, or tailored audit."
      }
    ]
  };
}
