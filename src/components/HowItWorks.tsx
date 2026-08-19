import { motion } from "framer-motion";
import { BookOpen, Hammer, ShieldCheck, MessageSquareText, Users } from "lucide-react";

const steps = [
    {
        icon: BookOpen,
        number: "01",
        title: "Learn",
        description:
            "Every task opens with its objective, why it matters, and the resources behind it — before you touch any instructions.",
        color: "text-apprenti-violet-on-dark",
        borderColor: "border-apprenti-violet/30",
        bgColor: "bg-apprenti-violet/10",
    },
    {
        icon: Hammer,
        number: "02",
        title: "Build",
        description:
            "Do the work in your own editor and tools. Evidence can be a repository, a commit, a tag, a URL, a test result, a benchmark, a demo, or plain markdown — whatever actually proves the work.",
        color: "text-apprenti-peach",
        borderColor: "border-apprenti-peach/30",
        bgColor: "bg-apprenti-peach/10",
    },
    {
        icon: ShieldCheck,
        number: "03",
        title: "Prove",
        description:
            "Package your evidence into a submission. The app validates required evidence before you can submit, and every submission becomes a durable, versioned Git object — not a database row.",
        color: "text-apprenti-cyan",
        borderColor: "border-apprenti-cyan/30",
        bgColor: "bg-apprenti-cyan/10",
    },
    {
        icon: MessageSquareText,
        number: "04",
        title: "Reflect",
        description:
            "Structured reflection prompts (drawn from the task itself) autosave locally and save durably to Git when you're ready, with an AI reflection coach and an AI-use disclosure built in.",
        color: "text-apprenti-magenta",
        borderColor: "border-apprenti-magenta/30",
        bgColor: "bg-apprenti-magenta/10",
    },
    {
        icon: Users,
        number: "05",
        title: "Review",
        description:
            "Your mentor reviews the task requirements, your evidence, and your reflection side by side, then approves, requests revisions, or opens a discussion — all recorded as a durable review object in Git.",
        color: "text-apprenti-violet-on-dark",
        borderColor: "border-apprenti-violet/30",
        bgColor: "bg-apprenti-violet/10",
    },
];

const flowNodes = steps.map((step) => ({
    label: step.title,
    icon: step.icon,
    color: step.color,
    bg: step.bgColor,
    border: step.borderColor,
}));

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-20 md:py-32">
            {/* Smooth background gradient */}
            <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, hsl(var(--muted) / 0.4), transparent 75%)' }} />
            <div className="container mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        How{" "}
                        <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
                            apprenti.dev
                        </span>{" "}
                        works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Learn → Build → Prove → Reflect → Review. One loop, repeated for every task, recorded entirely in Git.
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="relative"
                                >
                                    {/* Connector line (desktop) */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-12 left-full w-6 h-0.5 bg-gradient-to-r from-border to-transparent z-10" />
                                    )}

                                    <div
                                        className={`h-full p-6 rounded-2xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm`}
                                    >
                                        {/* Number badge */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span
                                                className={`text-xs font-mono font-bold ${step.color} opacity-60`}
                                            >
                                                {step.number}
                                            </span>
                                            <div
                                                className={`p-2 rounded-lg ${step.bgColor}`}
                                            >
                                                <Icon className={`h-5 w-5 ${step.color}`} />
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Vertical flow diagram */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="flex flex-col items-center gap-0">
                            {flowNodes.map((node, index) => {
                                const Icon = node.icon;
                                const isLast = index === flowNodes.length - 1;
                                return (
                                    <div key={index} className="flex flex-col items-center">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                            className={`flex items-center gap-3 px-6 py-3 rounded-xl border ${node.border} ${node.bg} backdrop-blur-sm min-w-[220px] justify-center`}
                                        >
                                            <Icon className={`h-5 w-5 ${node.color}`} />
                                            <span className="text-sm font-semibold">{node.label}</span>
                                        </motion.div>
                                        {!isLast && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                                                className="flex flex-col items-center py-1"
                                            >
                                                <div className="w-px h-4 bg-gradient-to-b from-border to-border/50" />
                                                <span className="text-muted-foreground/60 text-xs">↓</span>
                                                <div className="w-px h-4 bg-gradient-to-b from-border/50 to-transparent" />
                                            </motion.div>
                                        )}
                                        {isLast && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                                                className="flex flex-col items-center py-1"
                                            >
                                                <div className="w-px h-4 bg-gradient-to-b from-border to-border/50" />
                                                <span className="text-muted-foreground/60 text-xs">↻ back to Learn</span>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
