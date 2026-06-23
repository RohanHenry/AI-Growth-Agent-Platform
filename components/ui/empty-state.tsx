import Link from "next/link";
import { FilePlus2 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="rounded-md border border-dashed border-line bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-cloud text-brand">
        <FilePlus2 className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-ink">No landing pages yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        Generate your first strategy to start building a reusable library of campaign-ready
        landing pages.
      </p>
      <Link
        href="/generator"
        className="mt-5 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Create landing page
      </Link>
    </div>
  );
}
