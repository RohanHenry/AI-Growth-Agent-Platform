export type LandingPageStatus = "DRAFT" | "READY" | "PUBLISHED";

export type FaqItem = {
  question: string;
  answer: string;
};

export type LandingPageVariation = {
  name: string;
  audienceSegment: string;
  headline: string;
  subheading: string;
  cta: string;
  angle: string;
};

export type PersonalizationIdea = {
  segment: string;
  message: string;
  offer: string;
};

export type LandingPageInput = {
  companyName: string;
  websiteUrl: string;
  industry: string;
  targetAudience: string;
  productDescription: string;
  businessGoal: string;
  toneOfVoice: string;
  ctaGoal: string;
};

export type GeneratedLandingPage = {
  seoTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheading: string;
  ctaText: string;
  painPoints: string[];
  benefits: string[];
  faqs: FaqItem[];
  variations: LandingPageVariation[];
  personalizationIdeas: PersonalizationIdea[];
};

export type LandingPageRecord = LandingPageInput &
  GeneratedLandingPage & {
    id: string;
    status: LandingPageStatus;
    views: number;
    clicks: number;
    conversionRate: number;
    createdAt: Date;
    updatedAt: Date;
  };
