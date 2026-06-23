import type { LandingPageRecord } from "@/types/landing-page";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildLandingPageHtml(page: LandingPageRecord) {
  const benefits = page.benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const faqs = page.faqs
    .map(
      (faq) => `
        <details>
          <summary>${escapeHtml(faq.question)}</summary>
          <p>${escapeHtml(faq.answer)}</p>
        </details>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(page.seoTitle)}</title>
    <meta name="description" content="${escapeHtml(page.metaDescription)}" />
    <style>
      body { margin: 0; font-family: Inter, Arial, sans-serif; color: #14151f; }
      section { padding: 64px 24px; }
      .hero { background: #14151f; color: white; }
      .wrap { max-width: 1080px; margin: 0 auto; }
      h1 { font-size: clamp(40px, 7vw, 72px); line-height: 1; margin: 0; }
      p { line-height: 1.7; color: inherit; }
      .button { display: inline-block; margin-top: 24px; background: #e65f4f; color: white; padding: 14px 20px; border-radius: 6px; font-weight: 700; }
      .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
      .card { border: 1px solid #e6e8ef; border-radius: 8px; padding: 20px; }
      li { margin-bottom: 10px; }
    </style>
  </head>
  <body>
    <section class="hero">
      <div class="wrap">
        <h1>${escapeHtml(page.heroHeadline)}</h1>
        <p>${escapeHtml(page.heroSubheading)}</p>
        <a class="button" href="${escapeHtml(page.websiteUrl)}">${escapeHtml(page.ctaText)}</a>
      </div>
    </section>
    <section>
      <div class="wrap">
        <h2>Benefits</h2>
        <ul>${benefits}</ul>
        <h2>FAQ</h2>
        <div class="grid">${faqs}</div>
      </div>
    </section>
  </body>
</html>`;
}
