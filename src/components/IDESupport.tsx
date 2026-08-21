import { motion } from "framer-motion";
import {
    Smartphone,
    Tablet,
    Monitor,
    Laptop,
    Terminal,
    Github,
    Gitlab,
} from "lucide-react";
import { DownloadButtons } from "@/components/DownloadButtons";

const platforms = [
    { name: "Android", icon: Smartphone, kind: "platform" as const },
    { name: "iOS", icon: Tablet, kind: "platform" as const },
    { name: "Windows", icon: Monitor, kind: "platform" as const },
    { name: "macOS", icon: Laptop, kind: "platform" as const },
    { name: "Linux", icon: Terminal, kind: "platform" as const },
    { name: "GitHub", icon: Github, kind: "provider" as const },
    { name: "GitLab", icon: Gitlab, kind: "provider" as const },
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

export function PlatformSupport() {
    return (
        <section id="platforms" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        Works{" "}
                        <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
                            everywhere
                        </span>{" "}
                        you do
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        One shared codebase, running everywhere you work.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl mx-auto"
                >
                    {platforms.map((platform) => (
                        <motion.div
                            key={platform.name}
                            variants={item}
                            className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-apprenti-violet/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-apprenti-violet/20 to-apprenti-cyan/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative w-14 h-14 rounded-xl border border-border/50 bg-muted/40 flex items-center justify-center">
                                    <platform.icon className="h-6 w-6 text-apprenti-violet-on-dark" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-sm">{platform.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {platform.kind === "provider" ? "works with" : "supported"}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-10"
                >
                    <DownloadButtons align="center" />
                </motion.div>
            </div>
        </section>
    );
}
