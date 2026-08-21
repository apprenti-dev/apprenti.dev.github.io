export type CatalogCurriculum = {
	name: string;
	badge: string;
	description: string;
	languages: string[];
	platforms: string[];
	path: string;
};

export type CatalogGroup = {
	title: string;
	intro: string;
	curricula: CatalogCurriculum[];
};

export type CatalogRepo = {
	slug: string;
	owner: string;
	name: string;
	githubUrl: string;
	description: string;
	badge: string;
	groups: CatalogGroup[];
};

export const ISSUE_URL =
	"https://github.com/apprenti-dev/apprenti.dev.github.io/issues/new?template=curriculum-listing-request.yml";

export const catalogRepos: CatalogRepo[] = [
	{
		slug: "software-engineering-base",
		owner: "apprenti-dev",
		name: "software-engineering-base",
		githubUrl: "https://github.com/apprenti-dev/software-engineering-base",
		badge: "Official",
		description:
			"The reference working copy — two long-form apprenticeships and fourteen shorter specializations. Shared competencies and open resources live once at the repo root.",
		groups: [
			{
				title: "Reference apprenticeships",
				intro:
					"The long-form paths this repository was built around. Shared competencies and open resources live once at the repo root so every curriculum below can reuse them by id.",
				curricula: [
					{
						name: "Software Engineering Apprenticeship",
						badge: "Reference curriculum",
						description:
							"The first official apprenti.dev path — 54 tasks across four academic years plus summer practice, covering software engineering from first principles through independent, mentor-reviewed work.",
						languages: [
							"Python",
							"C",
							"JavaScript/TypeScript",
							"C#",
							"Go",
							"SQL",
							"Dart",
						],
						platforms: ["PostgreSQL", "MongoDB", "RabbitMQ", "Docker", "Git"],
						path: "curricula/software-engineering",
					},
					{
						name: "Data Analytics and AI Apprenticeship",
						badge: "v0.1 — growing",
						description:
							"Year 1 (both terms plus summer) and Year 2 Term 1 so far — 19 tasks moving from analytics and inference through first models to LLM and retrieval work, each evaluated on held-out cases, not vibes. Later years aren't authored yet.",
						languages: ["Python", "SQL"],
						platforms: ["pandas", "PostgreSQL", "SQLite", "scikit-learn", "Git"],
						path: "curricula/data-analytics-ai",
					},
				],
			},
			{
				title: "Focused paths — start here",
				intro:
					"Shorter specializations for people who already write software and want a mentor-reviewed path through one craft. Durations are the designed range, not a promise.",
				curricula: [
					{
						name: "AI-Native Software Engineering",
						badge: "4–6 months",
						description:
							"For working developers. Treat AI assistance as disclosed, verified professional practice — agentic workflows, review of generated changes, and knowing when not to reach for a model.",
						languages: ["Python"],
						platforms: ["Git"],
						path: "curricula/ai-native-software-engineering",
					},
					{
						name: "Backend Engineering",
						badge: "9–12 months",
						description:
							"For junior to mid-level developers specializing into services. Design, build, test, operate, and defend one coherent backend — HTTP APIs, data, messaging, containers, and CI.",
						languages: ["Python", "SQL"],
						platforms: ["PostgreSQL", "MongoDB", "RabbitMQ", "Docker", "Git"],
						path: "curricula/backend-engineering",
					},
					{
						name: "Software Architecture & System Design",
						badge: "6–9 months",
						description:
							"For mid to senior engineers. Non-functional requirements, defensible ADRs, capacity and SLO models, and defending a decision when a constraint changes.",
						languages: [],
						platforms: ["Git"],
						path: "curricula/software-architecture-system-design",
					},
					{
						name: "Engineering Foundations for Junior Developers",
						badge: "4–6 months",
						description:
							"For new graduates and juniors who can already code. Professional Git, reading unfamiliar code, testing what exists, methodical debugging, and writing for a reviewer.",
						languages: ["Python"],
						platforms: ["Git"],
						path: "curricula/engineering-foundations",
					},
				],
			},
			{
				title: "Specializations",
				intro:
					"Deeper paths that reuse the shared library and go further than the reference apprenticeships on one topic.",
				curricula: [
					{
						name: "Platform / DevOps Engineering",
						badge: "6–9 months",
						description:
							"Build a real pipeline, ship through it, observe what happens, and roll it back. Containers, CI, infrastructure as code, and production signal — locally first.",
						languages: ["Bash", "YAML"],
						platforms: ["Docker", "GitHub Actions", "OpenTofu", "Prometheus"],
						path: "curricula/platform-devops-engineering",
					},
					{
						name: "Distributed Systems Engineering",
						badge: "4–6 months",
						description:
							"For mid and senior backend engineers. Replicate, partition, and break systems until consistency and failure trade-offs are something you can reproduce, not folklore.",
						languages: [],
						platforms: ["PostgreSQL", "Kafka", "RabbitMQ", "Docker"],
						path: "curricula/distributed-systems-engineering",
					},
					{
						name: "Data Engineering",
						badge: "6–9 months",
						description:
							"The engineering of data movement — batch and stream pipelines, contracts, orchestration, idempotent reprocessing, schema evolution — distinct from the analytics and modelling path above.",
						languages: ["Python", "SQL"],
						platforms: ["PostgreSQL", "Kafka", "Git"],
						path: "curricula/data-engineering",
					},
					{
						name: "Application Security Engineering",
						badge: "4–6 months",
						description:
							"Defensive AppSec for software engineers: threat modelling, authentication, secure coding, secrets, and verified fixes. Find and fix issues in work you own — not a CTF.",
						languages: [],
						platforms: ["OWASP", "Git"],
						path: "curricula/application-security-engineering",
					},
					{
						name: "Software Quality & Test Engineering",
						badge: "4–6 months",
						description:
							"Map tests to real risk, measure quality directly, and defend the gates you add to a pipeline — contract tests, mutation testing, load tests, CI quality signals.",
						languages: [],
						platforms: ["GitHub Actions", "k6", "Pact"],
						path: "curricula/software-quality-test-engineering",
					},
				],
			},
			{
				title: "Shorter specializations",
				intro:
					"Tighter paths for experienced engineers who want evidence of one capability, not another multi-year apprenticeship.",
				curricula: [
					{
						name: "Engineering Leadership",
						badge: "4–6 months",
						description:
							"For seniors and tech leads. Mentoring, delegation, cross-team influence, and technical decisions at team scope — judged on inspectable briefs, reviews, and communications.",
						languages: [],
						platforms: ["Git"],
						path: "curricula/engineering-leadership",
					},
					{
						name: "Performance Engineering",
						badge: "3–4 months",
						description:
							"Measure first. Profile, benchmark, cache with evidence, load-test, and reason about capacity from numbers you produced — not guessed.",
						languages: [],
						platforms: ["OpenTelemetry", "Prometheus"],
						path: "curricula/performance-engineering",
					},
					{
						name: "Observability & Production Engineering",
						badge: "3–4 months",
						description:
							"Instrument, measure, alert, respond, and learn without blame. Logs, metrics, traces, SLOs, and incident response as evidence, not tooling tourism.",
						languages: [],
						platforms: ["OpenTelemetry", "Prometheus"],
						path: "curricula/observability-production-engineering",
					},
					{
						name: "Open Source Engineering",
						badge: "2–3 months",
						description:
							"Real contribution and maintainership. Evidence is an externally verifiable pull request, issue, or review — licensing, collaboration, and judgment under your own name.",
						languages: [],
						platforms: ["Git"],
						path: "curricula/open-source-engineering",
					},
					{
						name: "Industrial / Edge Software Engineering",
						badge: "6–9 months",
						description:
							"Resource-constrained and edge software: determinism, constrained memory, industrial protocols, and update safety. Host-side C, QEMU, or a board you already have — no proprietary kit required.",
						languages: ["C"],
						platforms: ["QEMU", "Git"],
						path: "curricula/industrial-edge-software-engineering",
					},
				],
			},
		],
	},
];

export function curriculumCount(repo: CatalogRepo): number {
	return repo.groups.reduce((n, g) => n + g.curricula.length, 0);
}

export function getCatalogRepo(slug: string): CatalogRepo | undefined {
	return catalogRepos.find((r) => r.slug === slug);
}
