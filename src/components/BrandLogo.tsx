import appIcon from "@/img/brand/app_icon_dark.png";

interface BrandLogoProps {
    /** e.g. header vs footer width cap */
    variant?: "header" | "footer";
    className?: string;
    /** Show "apprenti.dev" wordmark next to the mark. Default true. */
    showWordmark?: boolean;
}

export function BrandLogo({ variant = "header", className = "", showWordmark = true }: BrandLogoProps) {
    const isHeader = variant === "header";

    const iconSize = isHeader
        ? "h-9 w-9 md:h-10 md:w-10"
        : "h-10 w-10 md:h-11 md:w-11";
    const wordmarkSize = isHeader
        ? "text-xl md:text-2xl"
        : "text-xl md:text-2xl";

    return (
        <span className={`inline-flex items-center gap-2.5 shrink-0 min-w-0 ${className}`}>
            <img
                src={appIcon.src}
                width={appIcon.width}
                height={appIcon.height}
                alt="apprenti.dev"
                className={`${iconSize} shrink-0 rounded-[22%] object-contain`}
            />
            {showWordmark && (
                <span className={`${wordmarkSize} font-bold leading-none tracking-tight whitespace-nowrap`}>
                    <span className="text-foreground">apprenti</span>
                    <span className="bg-gradient-to-r from-apprenti-violet to-apprenti-magenta bg-clip-text text-transparent">
                        .dev
                    </span>
                </span>
            )}
        </span>
    );
}
