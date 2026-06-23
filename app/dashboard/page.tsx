import Link from "next/link";
import { Plus } from "lucide-react";
import { AnalyticsStrip } from "@/components/dashboard/analytics-strip";
import { PageCard } from "@/components/dashboard/page-card";
import { SearchFilter } from "@/components/dashboard/search-filter";
import { EmptyState } from "@/components/ui/empty-state";
import { listLandingPages } from "@/lib/actions/landing-pages";

type DashboardPageProps = {
  searchParams: Promise<{
    query?: string;
    status?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const pages = await listLandingPages(params);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-brand">
            Growth dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Generated landing pages</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Manage AI-generated page strategies, check campaign readiness, and review mock
            growth metrics.
          </p>
        </div>
        <Link
          href="/generator"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New page
        </Link>
      </div>

      <div className="mt-8">
        <AnalyticsStrip pages={pages} />
      </div>

      <div className="mt-6">
        <SearchFilter query={params.query} status={params.status} />
      </div>

      <div className="mt-6">
        {pages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {pages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
