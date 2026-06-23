import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { deleteLandingPage, getLandingPage, updateLandingPage } from "@/lib/actions/landing-pages";
import { LandingPagePreview } from "@/components/preview/landing-page-preview";
import { StatusBadge } from "@/components/ui/badge";
import { PageActions } from "@/components/dashboard/page-actions";
import { formatDate, formatPercent } from "@/lib/utils/format";

type PageDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function PageDetail({ params }: PageDetailProps) {
  const { id } = await params;
  const page = await getLandingPage(id);

  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Dashboard
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="space-y-4">
          <div className="rounded-md border border-line bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-ink">{page.companyName}</h1>
                <p className="mt-1 text-sm text-muted">{page.websiteUrl}</p>
              </div>
              <StatusBadge status={page.status} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
              <Metric label="Views" value={page.views.toLocaleString()} />
              <Metric label="Clicks" value={page.clicks.toLocaleString()} />
              <Metric label="Conv." value={formatPercent(page.conversionRate)} />
            </div>
            <p className="mt-4 text-xs font-medium text-muted">
              Last updated {formatDate(page.updatedAt)}
            </p>
          </div>

          <PageActions page={page} />

          <form
            action={updateLandingPage.bind(null, page.id)}
            className="rounded-md border border-line bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-ink">Edit core copy</h2>
            <div className="mt-5 space-y-4">
              <EditorField name="seoTitle" label="SEO title" defaultValue={page.seoTitle} />
              <EditorArea
                name="metaDescription"
                label="Meta description"
                defaultValue={page.metaDescription}
              />
              <EditorField
                name="heroHeadline"
                label="Hero headline"
                defaultValue={page.heroHeadline}
              />
              <EditorArea
                name="heroSubheading"
                label="Hero subheading"
                defaultValue={page.heroSubheading}
              />
              <EditorField name="ctaText" label="CTA text" defaultValue={page.ctaText} />
              <label className="block">
                <span className="text-sm font-semibold text-ink">Status</span>
                <select
                  name="status"
                  defaultValue={page.status}
                  className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="READY">Ready</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </label>
            </div>
            <button className="mt-5 rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Save changes
            </button>
          </form>

          <form action={deleteLandingPage.bind(null, page.id)}>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-coral/25 bg-coral/10 px-4 py-3 text-sm font-semibold text-coral hover:bg-coral/15">
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete landing page
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <LandingPagePreview input={page} generated={page} />
          <div className="grid gap-4 md:grid-cols-3">
            {page.personalizationIdeas.map((idea) => (
              <div key={idea.segment} className="rounded-md border border-line bg-white p-4">
                <p className="text-sm font-semibold text-ink">{idea.segment}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{idea.message}</p>
                <p className="mt-3 text-xs font-semibold text-brand">{idea.offer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function EditorField({
  name,
  label,
  defaultValue
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
    </label>
  );
}

function EditorArea({
  name,
  label,
  defaultValue
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={4}
        className="mt-2 w-full resize-y rounded-md border border-line bg-white px-3 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
    </label>
  );
}
