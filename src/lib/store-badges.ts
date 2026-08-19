/**
 * Shared "supported platforms" badge list and Tailwind classes.
 *
 * apprenti.dev has no app-store listings yet (see README "Status" — active
 * development across five platforms), and the application repository isn't
 * public yet either — so there is currently no outbound "get the app" link
 * anywhere on the site. Platform availability is shown as a plain badge row.
 */

export const PLATFORMS = ["Android", "iOS", "Windows", "macOS", "Linux"] as const;

export const PLATFORM_BADGE_CLASS =
  "inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground";
