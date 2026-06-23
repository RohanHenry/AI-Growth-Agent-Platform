"use client";

import { useState, useTransition } from "react";
import { Copy, Download, Loader2, RefreshCw } from "lucide-react";
import type { LandingPageRecord } from "@/types/landing-page";
import { buildLandingPageHtml } from "@/lib/utils/export-html";

export function PageActions({ page }: { page: LandingPageRecord }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function copyHtml() {
    await navigator.clipboard.writeText(buildLandingPageHtml(page));
    setMessage("HTML copied");
  }

  function downloadHtml() {
    const blob = new Blob([buildLandingPageHtml(page)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${page.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.html`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("HTML exported");
  }

  function regenerate(section: string) {
    setMessage("");
    startTransition(async () => {
      const response = await fetch(`/api/pages/${page.id}/regenerate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section })
      });

      if (response.ok) {
        setMessage(`${section} regenerated`);
        window.location.reload();
        return;
      }

      const data = await response.json();
      setMessage(data.error ?? "Regeneration failed");
    });
  }

  return (
    <div className="rounded-md border border-line bg-white p-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyHtml}
          className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink hover:bg-cloud"
        >
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy HTML
        </button>
        <button
          type="button"
          onClick={downloadHtml}
          className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink hover:bg-cloud"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export
        </button>
        {["hero", "seo", "faq", "benefits", "personalization"].map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => regenerate(section)}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
            )}
            {section}
          </button>
        ))}
      </div>
      {message ? <p className="mt-3 text-sm font-medium text-muted">{message}</p> : null}
    </div>
  );
}
