import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { CatalogGroup } from "@/lib/catalog";

type Props = {
	githubUrl: string;
	groups: CatalogGroup[];
};

function matchesQuery(
	query: string,
	name: string,
	description: string,
	languages: string[],
	platforms: string[],
	path: string,
	groupTitle: string,
): boolean {
	if (!query) return true;
	const hay = [name, description, path, groupTitle, ...languages, ...platforms]
		.join(" ")
		.toLowerCase();
	return hay.includes(query);
}

export function CurriculumSearch({ githubUrl, groups }: Props) {
	const [raw, setRaw] = useState("");
	const query = raw.trim().toLowerCase();

	const filtered = useMemo(
		() =>
			groups
				.map((group) => ({
					...group,
					curricula: group.curricula.filter((c) =>
						matchesQuery(
							query,
							c.name,
							c.description,
							c.languages,
							c.platforms,
							c.path,
							group.title,
						),
					),
				}))
				.filter((group) => group.curricula.length > 0),
		[groups, query],
	);

	const total = groups.reduce((n, g) => n + g.curricula.length, 0);
	const shown = filtered.reduce((n, g) => n + g.curricula.length, 0);

	return (
		<div>
			<div className="relative mb-3">
				<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					value={raw}
					onChange={(e) => setRaw(e.target.value)}
					placeholder="Search by name, language, platform…"
					aria-label="Search curricula in this repository"
					className="pl-9"
				/>
			</div>
			<p className="text-sm text-muted-foreground mb-8">
				{query
					? `${shown} of ${total} curricula match`
					: `${total} curricula in this repository`}
			</p>

			{filtered.length === 0 ? (
				<p className="text-muted-foreground">
					No curricula match “{raw.trim()}”. Try a language, a platform, or
					part of a title.
				</p>
			) : (
				filtered.map((group) => (
					<div key={group.title} className="mb-14">
						<h2 className="text-2xl md:text-3xl font-bold mb-2">
							{group.title}
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
							{group.intro}
						</p>
						<div className="grid grid-cols-1 gap-6">
							{group.curricula.map((c) => (
								<div
									key={c.path}
									className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg shadow-apprenti-violet/5 p-8"
								>
									<div className="flex flex-wrap items-center gap-3 mb-3">
										<h3 className="text-2xl font-bold">{c.name}</h3>
										<span className="inline-flex items-center rounded-full border border-apprenti-violet/30 bg-apprenti-violet/10 px-3 py-1 text-xs font-semibold text-apprenti-violet-on-dark">
											{c.badge}
										</span>
									</div>
									<p className="text-muted-foreground leading-relaxed mb-4">
										{c.description}
									</p>
									<div className="flex flex-wrap gap-2 mb-4">
										{c.languages.map((lang) => (
											<span
												key={lang}
												className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
											>
												{lang}
											</span>
										))}
										{c.platforms.map((platform) => (
											<span
												key={platform}
												className="inline-flex items-center rounded-full border border-apprenti-cyan/30 bg-apprenti-cyan/10 px-3 py-1 text-xs font-medium text-apprenti-cyan"
											>
												{platform}
											</span>
										))}
									</div>
									<div className="flex flex-wrap items-center gap-4">
										<a
											href={`${githubUrl}/tree/main/${c.path}`}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
										>
											View on GitHub →
										</a>
										<code className="text-sm text-muted-foreground">
											{c.path}
										</code>
									</div>
								</div>
							))}
						</div>
					</div>
				))
			)}
		</div>
	);
}
