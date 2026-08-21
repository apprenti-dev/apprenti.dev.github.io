import { Download } from "lucide-react";
import { ALL_RELEASES_URL, LATEST_RELEASE_URL } from "@/lib/downloads";
import { cn } from "@/lib/utils";

const downloadClass =
	"inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors";

const versionsClass =
	"text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

type Props = {
	align?: "start" | "center";
	size?: "sm" | "md";
	className?: string;
};

export function DownloadButtons({
	align = "start",
	size = "md",
	className,
}: Props) {
	const buttonSize = size === "sm" ? "h-9 px-4 text-sm" : "h-10 px-6";

	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-x-4 gap-y-2",
				align === "center" && "justify-center",
				className,
			)}
		>
			<a
				href={LATEST_RELEASE_URL}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(downloadClass, buttonSize)}
			>
				<Download className="h-4 w-4" />
				Download
			</a>
			<a
				href={ALL_RELEASES_URL}
				target="_blank"
				rel="noopener noreferrer"
				className={versionsClass}
			>
				All versions
			</a>
		</div>
	);
}
