"use client";

import { useMemo, useState, useTransition } from "react";
import { Loader2, Save, Sparkles } from "lucide-react";
import { createLandingPage } from "@/lib/actions/landing-pages";
import { LandingPagePreview } from "@/components/preview/landing-page-preview";
import type { GeneratedLandingPage, LandingPageInput } from "@/types/landing-page";

const initialInput: LandingPageInput = {
  companyName: "",
  websiteUrl: "",
  industry: "",
  targetAudience: "",
  productDescription: "",
  businessGoal: "",
  toneOfVoice: "Confident, clear, and customer-focused",
  ctaGoal: "Book a demo"
};

const toneOptions = [
  "Confident, clear, and customer-focused",
  "Warm, consultative, and practical",
  "Bold, concise, and growth-oriented",
  "Premium, polished, and strategic"
];

export function GeneratorClient() {
  const [input, setInput] = useState<LandingPageInput>(initialInput);
  const [generated, setGenerated] = useState<GeneratedLandingPage | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, startSaving] = useTransition();

  const canSave = useMemo(() => Boolean(generated) && !isSaving, [generated, isSaving]);

  function updateField(name: keyof LandingPageInput, value: string) {
    setInput((current) => ({ ...current, [name]: value }));
  }

  async function handleGenerate() {
    setError("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Generation failed.");
      }

      setGenerated(data.generated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSave() {
    if (!generated) return;
    startSaving(async () => {
      await createLandingPage({ ...input, ...generated });
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-md border border-line bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-brand">Campaign brief</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Generate a landing page</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Enter the business context once. The agent will return SEO copy, conversion
            messaging, FAQs, variations, and personalization ideas.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <TextField
            label="Company name"
            value={input.companyName}
            onChange={(value) => updateField("companyName", value)}
            placeholder="Northstar Analytics"
          />
          <TextField
            label="Website URL"
            value={input.websiteUrl}
            onChange={(value) => updateField("websiteUrl", value)}
            placeholder="https://northstar.example"
          />
          <TextField
            label="Industry"
            value={input.industry}
            onChange={(value) => updateField("industry", value)}
            placeholder="B2B SaaS analytics"
          />
          <TextArea
            label="Target audience"
            value={input.targetAudience}
            onChange={(value) => updateField("targetAudience", value)}
            placeholder="Revenue leaders and growth teams at mid-market SaaS companies"
          />
          <TextArea
            label="Product/service description"
            value={input.productDescription}
            onChange={(value) => updateField("productDescription", value)}
            placeholder="Describe the offer, key features, differentiators, and customer outcomes."
          />
          <TextArea
            label="Business goal"
            value={input.businessGoal}
            onChange={(value) => updateField("businessGoal", value)}
            placeholder="Increase qualified demo bookings from organic and paid landing page traffic."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Tone of voice</span>
              <select
                value={input.toneOfVoice}
                onChange={(event) => updateField("toneOfVoice", event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
              >
                {toneOptions.map((tone) => (
                  <option key={tone}>{tone}</option>
                ))}
              </select>
            </label>
            <TextField
              label="CTA goal"
              value={input.ctaGoal}
              onChange={(value) => updateField("ctaGoal", value)}
              placeholder="Book a demo"
            />
          </div>
        </div>

        {error ? (
          <p className="mt-5 rounded-md border border-coral/20 bg-coral/10 p-3 text-sm font-medium text-coral">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            )}
            {isGenerating ? "Generating" : "Generate strategy"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-cloud disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {isSaving ? "Saving" : "Save page"}
          </button>
        </div>
      </section>

      <section>
        {generated ? (
          <LandingPagePreview input={input} generated={generated} />
        ) : (
          <div className="flex min-h-[560px] items-center justify-center rounded-md border border-dashed border-line bg-white p-8 text-center">
            <div>
              <Sparkles className="mx-auto h-10 w-10 text-brand" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-ink">Preview appears here</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Generate a strategy to preview the landing page structure, SEO details,
                variations, FAQ, and conversion copy.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full resize-y rounded-md border border-line bg-white px-3 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
    </label>
  );
}
