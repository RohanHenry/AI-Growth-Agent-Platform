import { cn } from "@/lib/utils/cn";
import type { LandingPageStatus } from "@/types/landing-page";

const styles: Record<LandingPageStatus, string> = {
  DRAFT: "bg-amber/12 text-amber border-amber/20",
  READY: "bg-brand/10 text-brand border-brand/15",
  PUBLISHED: "bg-mint/10 text-mint border-mint/20"
};

export function StatusBadge({ status }: { status: LandingPageStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold",
        styles[status]
      )}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
