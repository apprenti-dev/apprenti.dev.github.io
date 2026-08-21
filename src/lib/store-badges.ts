/**
 * Shared "supported platforms" badge list and Tailwind classes.
 *
 * App binaries are on GitHub Releases (`src/lib/downloads.ts`). There are no
 * app-store listings — see `/docs/installing`.
 */

export const PLATFORMS = ["Android", "Windows", "macOS", "Linux"] as const;

export const PLATFORM_BADGE_CLASS =
  "inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground";
