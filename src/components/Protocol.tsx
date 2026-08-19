import { motion } from "framer-motion";
import {
    GitBranch,
    Cloud,
    Database,
    Smartphone,
    GitFork,
    Layers,
} from "lucide-react";

const layers = [
    {
        icon: GitBranch,
        name: "Your Git repository",
        description:
            "Curriculum, tasks, reflections, submissions, and mentor reviews — all plain JSON and Markdown files, versioned like any other code.",
        color: "text-apprenti-cyan",
    },
    {
        icon: Cloud,
        name: "GitHub / GitLab remote",
        description:
            "Just a remote, like any other. Fetch, commit, and push on your own schedule — nothing is synced automatically without you.",
        color: "text-apprenti-peach",
    },
    {
        icon: Database,
        name: "SQLite local projection",
        description:
            "A fast, on-device copy for offline browsing, full-text search, and AI indexing. It can always be rebuilt from Git — it's a cache, never the record of truth.",
        color: "text-apprenti-magenta",
    },
    {
        icon: Smartphone,
        name: "The apprenti.dev app",
        description:
            "Reads and writes through that projection. Works fully offline; syncs to Git only when you choose to.",
        color: "text-apprenti-violet-on-dark",
    },
    {
        icon: GitFork,
        name: "Fork anywhere",
        description:
            "Because it's just a Git repository, you can fork the app's curriculum — or the whole ecosystem — at any time. No platform lock-in.",
        color: "text-slate-400",
    },
];

export function Architecture() {
    return (
        <section id="architecture" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Text */}
                    <div className="flex-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-apprenti-cyan/30 bg-apprenti-cyan/10 px-3 py-1 text-xs font-medium text-apprenti-cyan">
                                <Layers className="h-3 w-3" />
                                No Backend
                            </div>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold"
                        >
                            Built on{" "}
                            <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
                                Git
                            </span>
                            , not a database
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-muted-foreground leading-relaxed max-w-xl"
                        >
                            There's no apprenti.dev backend. Git is the durable, synchronized
                            store — everything else is a fast local view on top of it.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="text-muted-foreground leading-relaxed max-w-xl"
                        >
                            That means no vendor lock-in, no accounts to lose access to, and no
                            service that can shut down and take your apprenticeship history with
                            it. Everything you can see in the app, you can also read straight out
                            of the repository.
                        </motion.p>
                    </div>

                    {/* Right: Layer stack */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 w-full max-w-md"
                    >
                        <div className="space-y-2">
                            {layers.map((layer, index) => (
                                <motion.div
                                    key={layer.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                                    className="flex items-start gap-4 p-3 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-colors"
                                >
                                    <layer.icon className={`h-4 w-4 mt-0.5 shrink-0 ${layer.color}`} />
                                    <div>
                                        <span className={`text-sm font-medium ${layer.color}`}>
                                            {layer.name}
                                        </span>
                                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                            {layer.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-xs text-muted-foreground font-mono">
                                Git in, SQLite cache, Git out
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
