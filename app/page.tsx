import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardCheck, WandSparkles } from "lucide-react";

const capabilities = [
  "Conversion-focused hero copy",
  "SEO titles and meta descriptions",
  "Customer pain points and benefits",
  "Personalized campaign variations",
  "Editable saved landing pages",
  "Mock analytics and status tracking"
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-line bg-cloud px-3 py-2 text-sm font-medium text-muted">
              <WandSparkles className="h-4 w-4 text-brand" aria-hidden="true" />
              AI growth workflows for modern websites
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-ink sm:text-5xl lg:text-6xl">
              AI Website Growth Agent Platform
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Generate landing page strategy, SEO copy, buyer-specific variations, and
              conversion assets from a single company brief. Save, edit, preview, and manage
              every page from a focused SaaS dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/generator"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700"
              >
                Create a page
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-cloud"
              >
                Open dashboard
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-line bg-cloud p-4 shadow-soft">
            <div className="rounded-md bg-white p-5">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <p className="text-sm font-semibold text-ink">Growth brief</p>
                  <p className="text-xs text-muted">B2B SaaS campaign</p>
                </div>
                <span className="rounded-md bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                  Ready
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {capabilities.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-brand">
                      <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["18.4k", "Views"],
                  ["1.8k", "Clicks"],
                  ["9.7%", "Conv."]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md border border-line p-3">
                    <p className="text-lg font-semibold text-ink">{value}</p>
                    <p className="text-xs text-muted">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-md bg-ink p-5 text-white">
                <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <BarChart3 className="h-4 w-4" aria-hidden="true" />
                  Generated recommendation
                </div>
                <p className="mt-3 text-xl font-semibold">
                  Lead with time-to-value, then personalize proof by segment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
