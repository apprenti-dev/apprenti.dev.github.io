/**
 * Shared "get the app" links and Tailwind classes.
 *
 * apprenti.dev has no app-store listings yet (see README "Status" — active
 * development across five platforms). Until there's a real store presence,
 * the primary call to action is the GitHub repository; platform availability
 * is shown as a plain badge row instead of store badges.
 */

export const GITHUB_REPO_URL = "https://github.com/apprenti-dev/apprentiapp";

export const PLATFORMS = ["Android", "iOS", "Windows", "macOS", "Linux"] as const;

export const CTA_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-full bg-apprenti-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-apprenti-violet/25 transition-colors hover:bg-apprenti-violet/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apprenti-violet-on-dark/60 focus-visible:ring-offset-2";

export const PLATFORM_BADGE_CLASS =
  "inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground";
