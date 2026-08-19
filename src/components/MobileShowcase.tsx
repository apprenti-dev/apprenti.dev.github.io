import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";
import { StoreBadges } from "@/components/StoreBadges";

const screenshots = [
    {
        light: "/screenshots/mobile/today-light.png",
        dark: "/screenshots/mobile/today-dark.png",
        alt: "apprenti.dev — Today",
        caption: "Today",
        description: "Your current task, front and center",
    },
    {
        light: "/screenshots/mobile/path-light.png",
        dark: "/screenshots/mobile/path-dark.png",
        alt: "apprenti.dev — Path",
        caption: "Path",
        description: "Browse the whole curriculum",
    },
    {
        light: "/screenshots/mobile/task-detail-light.png",
        dark: "/screenshots/mobile/task-detail-dark.png",
        alt: "apprenti.dev — Task detail",
        caption: "Task",
        description: "Objective, evidence, and reflection in one place",
    },
    {
        light: "/screenshots/mobile/ai-light.png",
        dark: "/screenshots/mobile/ai-dark.png",
        alt: "apprenti.dev — AI assistance",
        caption: "AI",
        description: "Explain, hint, or quiz — local or cloud, your choice",
    },
    {
        light: "/screenshots/mobile/search-light.png",
        dark: "/screenshots/mobile/search-dark.png",
        alt: "apprenti.dev — Search",
        caption: "Search",
        description: "Find any task or note, fully offline",
    },
    {
        light: "/screenshots/mobile/reviews-light.png",
        dark: "/screenshots/mobile/reviews-dark.png",
        alt: "apprenti.dev — Mentor reviews",
        caption: "Reviews",
        description: "Approve or request revision, durably recorded in Git",
    },
];

export function MobileShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Listen for theme changes (class "dark" on <html>)
    useEffect(() => {
        const root = document.documentElement;
        setIsDark(root.classList.contains("dark"));
        const observer = new MutationObserver(() => {
            setIsDark(root.classList.contains("dark"));
        });
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const getImgSrc = (shot: (typeof screenshots)[number]) =>
        isDark ? shot.dark : shot.light;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }, []);

    useEffect(() => {
        if (lightboxOpen) return;
        const interval = setInterval(nextSlide, 30000);
        return () => clearInterval(interval);
    }, [nextSlide, lightboxOpen]);

    const getVisibleScreenshots = () => {
        const prev = (currentIndex - 1 + screenshots.length) % screenshots.length;
        const next = (currentIndex + 1) % screenshots.length;
        return { prev, current: currentIndex, next };
    };

    const { prev, current, next } = getVisibleScreenshots();

    return (
        <section id="screenshots" className="py-20 md:py-32 overflow-hidden">
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
                        <span className="bg-gradient-to-r from-apprenti-violet to-apprenti-cyan bg-clip-text text-transparent">
                            wherever you work
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        apprenti.dev runs on Android, iOS, Windows, macOS, and Linux — one
                        Flutter codebase, offline-first by design.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.15 }}
                        className="pt-2 w-full flex justify-center lg:justify-start"
                    >
                        <StoreBadges />
                    </motion.div>
                </div>

                {/* Carousel: prev / current / next */}
                <div className="flex items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
                    {/* Previous */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="hidden md:flex flex-col items-center cursor-pointer"
                        onClick={prevSlide}
                    >
                        <div className="relative">
                            <img
                                src={getImgSrc(screenshots[prev])}
                                alt={screenshots[prev].alt}
                                className="w-40 md:w-48 rounded-[1.5rem] shadow-xl border border-border/30 opacity-60 hover:opacity-80 transition-opacity bg-white dark:bg-zinc-900"
                            />
                        </div>
                        <div className="mt-3 text-center">
                            <p className="font-semibold text-xs text-muted-foreground">{screenshots[prev].caption}</p>
                        </div>
                    </motion.div>

                    {/* Current (featured) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="relative flex flex-col items-center z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-apprenti-violet/30 to-apprenti-cyan/20 rounded-3xl blur-2xl scale-110 animate-pulse-glow" />
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`${current}-${isDark}`}
                                    src={getImgSrc(screenshots[current])}
                                    alt={screenshots[current].alt}
                                    className="w-52 md:w-64 rounded-[2rem] shadow-2xl shadow-apprenti-violet/20 border border-border/30 cursor-pointer bg-white dark:bg-zinc-900"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => setLightboxOpen(true)}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="font-semibold text-sm">{screenshots[current].caption}</p>
                            <p className="text-xs text-muted-foreground">{screenshots[current].description}</p>
                        </div>
                    </motion.div>

                    {/* Next */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hidden md:flex flex-col items-center cursor-pointer"
                        onClick={nextSlide}
                    >
                        <div className="relative">
                            <img
                                src={getImgSrc(screenshots[next])}
                                alt={screenshots[next].alt}
                                className="w-40 md:w-48 rounded-[1.5rem] shadow-xl border border-border/30 opacity-60 hover:opacity-80 transition-opacity bg-white dark:bg-zinc-900"
                            />
                        </div>
                        <div className="mt-3 text-center">
                            <p className="font-semibold text-xs text-muted-foreground">{screenshots[next].caption}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Carousel controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={prevSlide}
                        className="p-2 rounded-full bg-apprenti-violet/20 hover:bg-apprenti-violet/40 transition-colors text-foreground"
                        aria-label="Previous screenshot"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex gap-1.5">
                        {screenshots.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? "bg-apprenti-cyan w-5"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                aria-label={`Go to screenshot ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextSlide}
                        className="p-2 rounded-full bg-apprenti-violet/20 hover:bg-apprenti-violet/40 transition-colors text-foreground"
                        aria-label="Next screenshot"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                images={screenshots.map((s) => ({ src: getImgSrc(s), alt: s.alt, caption: s.caption }))}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </section>
    );
}
