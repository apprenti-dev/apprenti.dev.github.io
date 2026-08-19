import { motion } from "framer-motion";
import {
  GitBranch,
  WifiOff,
  Sparkles,
  Cpu,
  GitFork,
  ClipboardCheck,
} from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Git is the source of truth",
    description:
      "No application backend, no proprietary database, no vendor lock-in. Curriculum, tasks, reflections, submissions, and mentor reviews are all just files in a Git repository — yours to keep, move, or fork at any time.",
    gradient: "from-apprenti-violet to-apprenti-magenta",
  },
  {
    icon: WifiOff,
    title: "Offline-first, always",
    description:
      "Browse the curriculum, read resources, work tasks, write reflections, run local AI, and search — all without a connection. Sync happens only when you choose to fetch, reconcile, commit, and push.",
    gradient: "from-apprenti-cyan to-apprenti-violet",
  },
  {
    icon: Sparkles,
    title: "AI that assists, never decides",
    description:
      "Explain, hint, quiz, and reflection-coaching are available on every task, governed by that task's own AI policy — and AI never auto-approves a submission. Review always ends with a human.",
    spec: "Human-in-the-loop",
    gradient: "from-apprenti-magenta to-apprenti-peach",
  },
  {
    icon: Cpu,
    title: "Local models or cloud — your choice",
    description:
      "The same explain, hint, and quiz capability runs on a fully local GGUF model or on OpenAI, Mistral, Anthropic, or OpenRouter — decoupled from the assistant itself, and always labeled so you know which one just answered.",
    gradient: "from-apprenti-peach to-apprenti-magenta",
  },
  {
    icon: GitFork,
    title: "Forkable, curriculum-agnostic",
    description:
      "apprenti.dev isn't tied to one subject. The first official path is the Software Engineering apprenticeship, but the app is built to run any curriculum you fork or author from scratch.",
    gradient: "from-apprenti-violet to-apprenti-cyan",
  },
  {
    icon: ClipboardCheck,
    title: "Mentor review, built in",
    description:
      "A dedicated review workflow — inbox, three-pane review screen, approve / request revision / discuss / follow-up task — with every decision written back as durable Git history, not a ticket in someone else's system.",
    gradient: "from-apprenti-cyan to-apprenti-magenta",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Built on{" "}
            <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
              files you own
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Every layer of apprenti.dev is built to keep you in control of your
            own learning record.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-apprenti-violet/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
                {feature.spec && (
                  <span className="inline-block mt-3 text-xs font-mono text-apprenti-cyan/70 bg-apprenti-cyan/10 px-2 py-0.5 rounded">
                    {feature.spec}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
