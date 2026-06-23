import { z } from "zod";

export const landingPageInputSchema = z.object({
  companyName: z.string().min(2, "Company name is required").max(90),
  websiteUrl: z.string().url("Enter a valid website URL"),
  industry: z.string().min(2, "Industry is required").max(80),
  targetAudience: z.string().min(8, "Describe the target audience").max(240),
  productDescription: z.string().min(20, "Add more product detail").max(900),
  businessGoal: z.string().min(8, "Business goal is required").max(300),
  toneOfVoice: z.string().min(2, "Tone is required").max(80),
  ctaGoal: z.string().min(3, "CTA goal is required").max(120)
});

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string()
});

export const variationSchema = z.object({
  name: z.string(),
  audienceSegment: z.string(),
  headline: z.string(),
  subheading: z.string(),
  cta: z.string(),
  angle: z.string()
});

export const personalizationIdeaSchema = z.object({
  segment: z.string(),
  message: z.string(),
  offer: z.string()
});

export const generatedLandingPageSchema = z.object({
  seoTitle: z.string(),
  metaDescription: z.string(),
  heroHeadline: z.string(),
  heroSubheading: z.string(),
  ctaText: z.string(),
  painPoints: z.array(z.string()).min(3),
  benefits: z.array(z.string()).min(3),
  faqs: z.array(faqSchema).min(4),
  variations: z.array(variationSchema).length(3),
  personalizationIdeas: z.array(personalizationIdeaSchema).min(3)
});

export const landingPageSaveSchema = landingPageInputSchema.merge(generatedLandingPageSchema);

export type LandingPageInputValues = z.infer<typeof landingPageInputSchema>;
export type GeneratedLandingPageValues = z.infer<typeof generatedLandingPageSchema>;
