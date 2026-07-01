import type { LandingPage } from "@prisma/client";
import type {
  FaqItem,
  LandingPageRecord,
  LandingPageStatus,
  LandingPageVariation,
  PersonalizationIdea
} from "@/types/landing-page";

const landingPageStatuses: LandingPageStatus[] = ["DRAFT", "READY", "PUBLISHED"];

function parseJsonField<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function normalizeStatus(status: string): LandingPageStatus {
  return landingPageStatuses.includes(status as LandingPageStatus)
    ? (status as LandingPageStatus)
    : "DRAFT";
}

export function toLandingPageRecord(page: LandingPage): LandingPageRecord {
  return {
    ...page,
    status: normalizeStatus(page.status),
    painPoints: parseJsonField<string[]>(page.painPoints, []),
    benefits: parseJsonField<string[]>(page.benefits, []),
    faqs: parseJsonField<FaqItem[]>(page.faqs, []),
    variations: parseJsonField<LandingPageVariation[]>(page.variations, []),
    personalizationIdeas: parseJsonField<PersonalizationIdea[]>(
      page.personalizationIdeas,
      []
    )
  };
}