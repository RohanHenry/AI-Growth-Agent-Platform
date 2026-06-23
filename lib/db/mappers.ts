import type { LandingPage } from "@prisma/client";
import type {
  FaqItem,
  LandingPageRecord,
  LandingPageVariation,
  PersonalizationIdea
} from "@/types/landing-page";

export function toLandingPageRecord(page: LandingPage): LandingPageRecord {
  return {
    ...page,
    painPoints: JSON.stringify([
      "Growth data lives across tools that do not agree.",
      "Teams struggle to connect product usage to revenue outcomes."
    ]),
    benefits: JSON.stringify([
      "Growth data lives across tools that do not agree.",
      "Teams struggle to connect product usage to revenue outcomes."
    ]),
    faqs: JSON.stringify([
      "Growth data lives across tools that do not agree.",
      "Teams struggle to connect product usage to revenue outcomes."
    ]),
    variations: JSON.stringify([
      "Growth data lives across tools that do not agree.",
      "Teams struggle to connect product usage to revenue outcomes."
    ]),
    personalizationIdeas: JSON.stringify([
      "Growth data lives across tools that do not agree.",
      "Teams struggle to connect product usage to revenue outcomes."
    ]),
  };
}
