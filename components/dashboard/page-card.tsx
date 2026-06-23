import Link from "next/link";
import { ArrowRight, MousePointerClick } from "lucide-react";
import type { LandingPageRecord } from "@/types/landing-page";
import { formatDate, formatPercent } from "@/lib/utils/format";
import { StatusBadge } from "@/components/ui/badge";

export function PageCard({ page }: { page: LandingPageRecord }) {
  return (
    <article className="rounded-md border border-line bg-white p-5 shadow-sm transition hover:shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-ink">{page.companyName}</h2>
            <StatusBadge status={page.status} />
          </div>
          <p className="mt-1 text-sm text-muted">{page.industry}</p>
        </div>
        <p className="text-xs font-medium text-muted">{formatDate(page.updatedAt)}</p>
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">{page.heroHeadline}</p>
      <div className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
        <div>
          <p className="text-sm font-semibold text-ink">{page.views.toLocaleString()}</p>
          <p className="text-xs text-muted">Views</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{page.clicks.toLocaleString()}</p>
          <p className="text-xs text-muted">Clicks</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{formatPercent(page.conversionRate)}</p>
          <p className="text-xs text-muted">Conv.</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-muted">
          <MousePointerClick className="h-4 w-4" aria-hidden="true" />
          {page.ctaText}
        </span>
        <Link
          href={`/dashboard/pages/${page.id}`}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-brand hover:bg-brand/10"
        >
          View
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
