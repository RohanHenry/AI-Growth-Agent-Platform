import { CheckCircle2, SearchCheck } from "lucide-react";
import type { GeneratedLandingPage, LandingPageInput } from "@/types/landing-page";

export function LandingPagePreview({
  input,
  generated
}: {
  input: LandingPageInput;
  generated: GeneratedLandingPage;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white shadow-soft">
      <section className="bg-ink px-6 py-10 text-white sm:px-8">
        <p className="text-sm font-medium text-white/65">{input.industry}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
          {generated.heroHeadline}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
          {generated.heroSubheading}
        </p>
        <button className="mt-6 rounded-md bg-coral px-5 py-3 text-sm font-semibold text-white">
          {generated.ctaText}
        </button>
      </section>

      <section className="grid gap-6 border-b border-line p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md bg-brand/10 px-3 py-2 text-sm font-semibold text-brand">
            <SearchCheck className="h-4 w-4" aria-hidden="true" />
            SEO package
          </div>
          <h3 className="mt-4 text-xl font-semibold text-ink">{generated.seoTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{generated.metaDescription}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {generated.benefits.map((benefit) => (
            <div key={benefit} className="rounded-md border border-line p-4">
              <CheckCircle2 className="h-5 w-5 text-mint" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium leading-6 text-ink">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 border-b border-line p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-ink">Customer pain points</h3>
          <div className="mt-4 space-y-3">
            {generated.painPoints.map((painPoint) => (
              <p key={painPoint} className="rounded-md bg-cloud p-3 text-sm leading-6 text-muted">
                {painPoint}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ink">FAQ</h3>
          <div className="mt-4 space-y-3">
            {generated.faqs.map((faq) => (
              <details key={faq.question} className="rounded-md border border-line p-4">
                <summary className="cursor-pointer text-sm font-semibold text-ink">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-ink">Landing page variations</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {generated.variations.map((variation) => (
            <div key={variation.name} className="rounded-md border border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-normal text-brand">
                {variation.name}
              </p>
              <h4 className="mt-3 text-base font-semibold text-ink">{variation.headline}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{variation.subheading}</p>
              <p className="mt-3 text-xs font-medium text-muted">{variation.audienceSegment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
