import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.landingPage.upsert({
    where: { id: "seed-northstar-analytics" },
    update: {},
    create: {
      id: "seed-northstar-analytics",
      companyName: "Northstar Analytics",
      websiteUrl: "https://northstar.example",
      industry: "B2B SaaS analytics",
      targetAudience: "Revenue leaders and growth teams at mid-market SaaS companies",
      productDescription:
        "A revenue analytics platform that unifies product usage, CRM data, and marketing attribution so growth teams can identify expansion opportunities.",
      businessGoal: "Increase qualified demo bookings from organic and paid landing page traffic",
      toneOfVoice: "Confident, clear, and customer-focused",
      ctaGoal: "Book a demo",
      seoTitle: "Revenue Analytics for SaaS Growth Teams",
      metaDescription:
        "Unify product, CRM, and marketing data to uncover revenue opportunities and convert more high-intent visitors.",
      heroHeadline: "Find the revenue signals your growth team is missing",
      heroSubheading:
        "Northstar Analytics turns fragmented go-to-market data into clear conversion paths, expansion signals, and campaign decisions your team can act on.",
      ctaText: "Book a demo",
      painPoints: [
        "Growth data lives across tools that do not agree.",
        "Teams struggle to connect product usage to revenue outcomes.",
        "Campaign decisions take too long because reporting is manual.",
        "High-intent accounts are missed before sales can engage."
      ],
      benefits: [
        "Unify product, CRM, and attribution data in one workspace.",
        "Identify the accounts most likely to convert or expand.",
        "Prioritize campaigns around measurable revenue movement.",
        "Give growth and sales teams a shared source of truth."
      ],
      faqs: [
        {
          question: "Who should use Northstar Analytics?",
          answer:
            "Revenue, growth, and marketing teams that need clearer insight into which accounts are ready to convert or expand."
        },
        {
          question: "Does it replace our CRM?",
          answer:
            "No. It connects with CRM and product data to reveal signals that are usually scattered across separate tools."
        },
        {
          question: "How quickly can a team see value?",
          answer:
            "Most teams can start with a focused dashboard for one funnel or segment, then expand into deeper campaign analysis."
        },
        {
          question: "What should we measure first?",
          answer:
            "Start with qualified demo bookings, account engagement, pipeline influence, and expansion-ready account volume."
        }
      ],
      variations: [
        {
          name: "Executive",
          audienceSegment: "Revenue executives",
          headline: "Turn scattered growth data into revenue clarity",
          subheading:
            "Give leaders a reliable view of what is driving pipeline, conversion, and expansion.",
          cta: "Book a demo",
          angle: "Business clarity and accountability"
        },
        {
          name: "Operator",
          audienceSegment: "Growth operators",
          headline: "Spend less time stitching reports together",
          subheading:
            "Connect the signals your team already has and move faster from insight to campaign action.",
          cta: "See the workflow",
          angle: "Operational speed"
        },
        {
          name: "Sales",
          audienceSegment: "Sales teams",
          headline: "Know which accounts are ready for the next conversation",
          subheading:
            "Surface usage and intent signals before valuable opportunities go cold.",
          cta: "Find revenue signals",
          angle: "Account prioritization"
        }
      ],
      personalizationIdeas: [
        {
          segment: "Organic search visitors",
          message: "Lead with category education and revenue analytics use cases.",
          offer: "Revenue analytics checklist"
        },
        {
          segment: "Paid campaign visitors",
          message: "Match the ad promise to a focused demo booking flow.",
          offer: "Personalized demo"
        },
        {
          segment: "Returning accounts",
          message: "Show proof, integrations, and implementation confidence.",
          offer: "ROI walkthrough"
        }
      ],
      status: "PUBLISHED",,
      views: 18420,
      clicks: 1786,
      conversionRate: 9.7
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
