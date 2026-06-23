import { BarChart3, MousePointerClick, TrendingUp } from "lucide-react";
import type { LandingPageRecord } from "@/types/landing-page";
import { formatPercent } from "@/lib/utils/format";

export function AnalyticsStrip({ pages }: { pages: LandingPageRecord[] }) {
  const views = pages.reduce((sum, page) => sum + page.views, 0);
  const clicks = pages.reduce((sum, page) => sum + page.clicks, 0);
  const avgConversion =
    pages.length === 0
      ? 0
      : pages.reduce((sum, page) => sum + page.conversionRate, 0) / pages.length;

  const stats = [
    { label: "Total views", value: views.toLocaleString(), icon: BarChart3 },
    { label: "CTA clicks", value: clicks.toLocaleString(), icon: MousePointerClick },
    { label: "Avg. conversion", value: formatPercent(avgConversion), icon: TrendingUp }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-md border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">{stat.label}</p>
              <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-ink">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
