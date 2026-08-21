import { motion } from "framer-motion";
import { CheckCircle2, Clock, Circle } from "lucide-react";

const roadmapItems = [
    {
        title: "Offline curriculum browsing",
        description:
            "Open a curriculum repository and browse paths, tasks, and resources fully offline.",
        status: "done",
    },
    {
        title: "Git-native learning loop",
        description:
            "GitHub/GitLab sync, task tracking, reflections, and evidence submissions as durable Git history.",
        status: "done",
    },
    {
        title: "Mentor review & curriculum authoring",
        description:
            "Review inbox, approve/request-revision, fork-aware conflict handling between curriculum and personal work.",
        status: "done",
    },
    {
        title: "Competency tracking, search & journal",
        description:
            "Full-text search, competency evidence from approved work only, personal journal.",
        status: "done",
    },
    {
        title: "AI-assisted learning",
        description:
            "Curriculum-wide chat, save-as-note, and task-level explain/hint/quiz/coach are live — assistive, never authoritative, with a human mentor always reviewing the actual work.",
        status: "done",
    },
    {
        title: "Multi-curriculum support",
        description:
            "Multiple curricula in one repository, plus English/Turkish content overlays, are live.",
        status: "done",
    },
    {
        title: "The apprenti creator studio",
        description:
            "A visual authoring studio for building and maintaining curricula — path canvas, entity editors, locale board — is in development.",
        status: "in-progress",
    },
    {
        title: "Mentor-apprentice communication",
        description:
            "Threads, structured feedback, and help requests between a mentor and their apprentice — serverless and Git-backed, like everything else — are planned next.",
        status: "planned",
    },
];

const statusConfig: Record<
    string,
    { label: string; color: string; icon: typeof Clock }
> = {
    done: { label: "Done", color: "text-apprenti-cyan", icon: CheckCircle2 },
    "in-progress": { label: "In Progress", color: "text-apprenti-violet-on-dark", icon: Clock },
    planned: { label: "Planned", color: "text-muted-foreground", icon: Circle },
};

export function Roadmap() {
    return (
        <section id="roadmap" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        What's{" "}
                        <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
                            next
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Our roadmap for a Git-native, offline-first apprenticeship app.
                    </motion.p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-apprenti-violet-on-dark via-apprenti-cyan to-transparent" />

                        {roadmapItems.map((roadmapItem, index) => {
                            const status = statusConfig[roadmapItem.status];
                            const StatusIcon = status.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="relative pl-16 pb-10 last:pb-0"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full bg-background border-2 border-apprenti-violet-on-dark flex items-center justify-center">
                                        <div className={`w-2 h-2 rounded-full ${roadmapItem.status === "in-progress" ? "bg-apprenti-cyan animate-pulse" : roadmapItem.status === "done" ? "bg-apprenti-cyan" : "bg-muted-foreground/40"
                                            }`} />
                                    </div>

                                    <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold">
                                                    {roadmapItem.title}
                                                </h3>
                                                <span className={`inline-flex items-center gap-1 text-xs font-medium ${status.color}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {roadmapItem.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <p className="mt-8 text-sm italic text-muted-foreground text-center">
                        Builds are sideloaded from GitHub Releases. There are
                        no app-store listings.
                    </p>
                </div>
            </div>
        </section>
    );
}
