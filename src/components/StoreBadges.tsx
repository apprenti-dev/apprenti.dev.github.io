import { Github } from "lucide-react";
import {
  CTA_BUTTON_CLASS,
  GITHUB_REPO_URL,
  PLATFORMS,
  PLATFORM_BADGE_CLASS,
} from "@/lib/store-badges";

export { GITHUB_REPO_URL } from "@/lib/store-badges";

type StoreBadgesProps = {
  className?: string;
};

/**
 * "Get the app" call to action. apprenti.dev doesn't have app-store listings
 * yet, so this links to the GitHub repository and shows the platforms the
 * app targets as plain badges rather than store badges.
 */
export function StoreBadges({ className = "" }: StoreBadgesProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={CTA_BUTTON_CLASS}
        aria-label="View apprenti.dev on GitHub"
      >
        <Github className="h-4 w-4" />
        View on GitHub
      </a>
      <div className="flex flex-wrap items-center gap-2">
        {PLATFORMS.map((platform) => (
          <span key={platform} className={PLATFORM_BADGE_CLASS}>
            {platform}
          </span>
        ))}
        <span className="text-xs text-muted-foreground">— coming soon</span>
      </div>
    </div>
  );
}
