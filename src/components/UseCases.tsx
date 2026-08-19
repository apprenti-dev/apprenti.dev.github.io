import { motion } from "framer-motion";
import {
    GraduationCap,
    UserCheck,
    PenTool,
    Users,
} from "lucide-react";

const useCases = [
    {
        icon: GraduationCap,
        title: "For Apprentices",
        description:
            "Follow a curated path, complete structured tasks, and produce real evidence of your work instead of quiz scores. Keep reflections and learning notes, get AI guidance when you're stuck, and receive mentor feedback that tracks your competency growth over time.",
        example: "Today → Path → Task → Submit → Review",
        gradient: "from-apprenti-violet to-apprenti-cyan",
    },
    {
        icon: UserCheck,
        title: "For Mentors",
        description:
            "Curate or fork a curriculum, review submissions, and request revisions or approve evidence from a dedicated review inbox. Author tasks, modules, resources, and competency mappings directly, and track each apprentice's competency development from approved work — not self-reported progress.",
        example: "Reviews inbox → Approve / Request revision",
        gradient: "from-apprenti-magenta to-apprenti-violet",
    },
    {
        icon: PenTool,
        title: "For Content Creators",
        description:
            "apprenti creator is a companion VS Code extension for building and maintaining curricula — a visual path canvas, entity editors with live markdown preview, a locale board for translations, and a competency matrix, all writing the exact same files the app reads. It's the studio for designing the path, not a second runtime.",
        example: "Path canvas → Entity editor → Validate → Commit",
        gradient: "from-apprenti-peach to-apprenti-magenta",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function UseCases() {
    return (
        <section id="use-cases" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        One app,{" "}
                        <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
                            three roles
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Apprentices, mentors, and curriculum authors all work
                        against the same Git repository — just through
                        different tools.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
                >
                    {useCases.map((useCase, index) => {
                        const Icon = useCase.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-apprenti-violet/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div
                                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${useCase.gradient} mb-4`}
                                >
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                    {useCase.description}
                                </p>
                                <div className="rounded-lg bg-gray-900/90 dark:bg-muted/50 border border-gray-800/50 dark:border-border/30 px-3 py-2">
                                    <code className="text-xs font-mono text-apprenti-cyan">
                                        {useCase.example}
                                    </code>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-3 rounded-full border border-apprenti-violet-on-dark/30 bg-apprenti-violet/10 backdrop-blur-sm px-6 py-3">
                        <Users className="h-5 w-5 text-apprenti-cyan" />
                        <span className="text-sm font-medium">
                            apprenti.dev: one Git repository, every perspective
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
