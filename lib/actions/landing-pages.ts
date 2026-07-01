"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { toLandingPageRecord } from "@/lib/db/mappers";
import { landingPageSaveSchema } from "@/lib/schemas/landing-page";
import type { LandingPageRecord, LandingPageStatus } from "@/types/landing-page";

const landingPageStatuses: LandingPageStatus[] = ["DRAFT", "READY", "PUBLISHED"];

function isLandingPageStatus(value: string | undefined): value is LandingPageStatus {
  return Boolean(value && landingPageStatuses.includes(value as LandingPageStatus));
}

export async function listLandingPages(params?: {
  query?: string;
  status?: string;
}): Promise<LandingPageRecord[]> {
  const query = params?.query?.trim();
  const status = params?.status;

  const pages = await prisma.landingPage.findMany({
    where: {
      ...(query
        ? {
            OR: [
              { companyName: { contains: query, mode: "insensitive" } },
              { industry: { contains: query, mode: "insensitive" } },
              { targetAudience: { contains: query, mode: "insensitive" } }
            ]
          }
        : {}),
      ...(isLandingPageStatus(status) ? { status } : {})
    },
    orderBy: { updatedAt: "desc" }
  });

  return pages.map(toLandingPageRecord);
}

export async function getLandingPage(id: string): Promise<LandingPageRecord | null> {
  const page = await prisma.landingPage.findUnique({ where: { id } });
  return page ? toLandingPageRecord(page) : null;
}

export async function createLandingPage(data: unknown) {
  const parsed = landingPageSaveSchema.parse(data);
  const conversionRate = Number((Math.random() * 9 + 2).toFixed(1));
  const views = Math.floor(Math.random() * 14000 + 1200);
  const clicks = Math.floor((views * conversionRate) / 100);

  const page = await prisma.landingPage.create({
    data: {
      ...parsed,
      painPoints: JSON.stringify(parsed.painPoints),
      benefits: JSON.stringify(parsed.benefits),
      faqs: JSON.stringify(parsed.faqs),
      variations: JSON.stringify(parsed.variations),
      personalizationIdeas: JSON.stringify(parsed.personalizationIdeas),
      views,
      clicks,
      conversionRate,
      status: "READY"
    }
  });

  revalidatePath("/dashboard");
  redirect(`/dashboard/pages/${page.id}`);
}

export async function updateLandingPage(id: string, formData: FormData) {
  const status = formData.get("status")?.toString();

  const page = await prisma.landingPage.update({
    where: { id },
    data: {
      seoTitle: formData.get("seoTitle")?.toString() ?? "",
      metaDescription: formData.get("metaDescription")?.toString() ?? "",
      heroHeadline: formData.get("heroHeadline")?.toString() ?? "",
      heroSubheading: formData.get("heroSubheading")?.toString() ?? "",
      ctaText: formData.get("ctaText")?.toString() ?? "",
      status: isLandingPageStatus(status) ? status : "DRAFT"
    }
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/pages/${id}`);
  redirect(`/dashboard/pages/${page.id}`);
}

export async function deleteLandingPage(id: string) {
  await prisma.landingPage.delete({ where: { id } });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}