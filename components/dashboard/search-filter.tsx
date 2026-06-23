import { Search } from "lucide-react";

export function SearchFilter({
  query,
  status
}: {
  query?: string;
  status?: string;
}) {
  return (
    <form className="flex flex-col gap-3 rounded-md border border-line bg-white p-4 sm:flex-row">
      <label className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          name="query"
          defaultValue={query}
          placeholder="Search by company, industry, or audience"
          className="h-11 w-full rounded-md border border-line bg-white pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </label>
      <select
        name="status"
        defaultValue={status ?? ""}
        className="h-11 rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
      >
        <option value="">All statuses</option>
        <option value="DRAFT">Draft</option>
        <option value="READY">Ready</option>
        <option value="PUBLISHED">Published</option>
      </select>
      <button className="h-11 rounded-md bg-ink px-5 text-sm font-semibold text-white hover:bg-black">
        Apply
      </button>
    </form>
  );
}
