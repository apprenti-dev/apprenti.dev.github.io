import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Sparkles, Bot, Compass, Hammer, Upload, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";
import { PLATFORMS, PLATFORM_BADGE_CLASS } from "@/lib/store-badges";

const heroScreenshots = [
  {
    light: "/screenshots/mobile/today-light.png",
    dark: "/screenshots/mobile/today-dark.png",
    alt: "apprenti.dev — Today",
    caption: "Today",
  },
  {
    light: "/screenshots/mobile/path-light.png",
    dark: "/screenshots/mobile/path-dark.png",
    alt: "apprenti.dev — Path",
    caption: "Path",
  },
  {
    light: "/screenshots/mobile/task-detail-light.png",
    dark: "/screenshots/mobile/task-detail-dark.png",
    alt: "apprenti.dev — Task",
    caption: "Task",
  },
  {
    light: "/screenshots/mobile/ai-light.png",
    dark: "/screenshots/mobile/ai-dark.png",
    alt: "apprenti.dev — AI",
    caption: "AI",
  },
  {
    light: "/screenshots/mobile/search-light.png",
    dark: "/screenshots/mobile/search-dark.png",
    alt: "apprenti.dev — Search",
    caption: "Search",
  },
  {
    light: "/screenshots/mobile/reviews-light.png",
    dark: "/screenshots/mobile/reviews-dark.png",
    alt: "apprenti.dev — Reviews",
    caption: "Reviews",
  },
];

const highlights = [
  {
    icon: Compass,
    label: "Explore",
    desc: "Find your path through the curriculum",
  },
  {
    icon: Hammer,
    label: "Build",
    desc: "Do the actual work, in your own tools",
  },
  {
    icon: Upload,
    label: "Submit",
    desc: "Turn finished work into durable evidence",
  },
  {
    icon: TrendingUp,
    label: "Grow",
    desc: "Build tracked competency over time",
  },
];

export function Hero() {
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

  const getImgSrc = (shot: (typeof heroScreenshots)[number]) =>
    isDark ? shot.dark : shot.light;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroScreenshots.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroScreenshots.length) % heroScreenshots.length);
  }, []);

  useEffect(() => {
    if (lightboxOpen) return;
    const interval = setInterval(nextSlide, 30000);
    return () => clearInterval(interval);
  }, [nextSlide, lightboxOpen]);

  return (
    <section className="relative py-20 md:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[50rem] max-h-[50rem] bg-apprenti-violet/10 dark:bg-apprenti-violet/15 rounded-full filter blur-[160px] animate-blob" />
        <div className="absolute -top-1/4 right-0 w-[60vw] h-[60vw] max-w-[50rem] max-h-[50rem] bg-apprenti-magenta/5 dark:bg-apprenti-magenta/10 rounded-full filter blur-[180px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-1/4 left-1/3 w-[50vw] h-[50vw] max-w-[40rem] max-h-[40rem] bg-apprenti-cyan/5 dark:bg-apprenti-cyan/10 rounded-full filter blur-[160px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-apprenti-violet/30 bg-apprenti-violet/10 dark:bg-apprenti-violet/20 backdrop-blur-sm px-4 py-1.5 text-sm">
                <GraduationCap className="h-4 w-4 text-apprenti-violet-on-dark" />
                <span className="text-foreground/70 dark:text-muted-foreground font-semibold tracking-widest text-xs">
                  LEARN • BUILD • GROW
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-apprenti-cyan/30 bg-apprenti-cyan/10 dark:bg-apprenti-cyan/15 backdrop-blur-sm px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 text-apprenti-cyan" />
                <span className="text-foreground/70 dark:text-muted-foreground font-semibold tracking-widest text-xs">
                  FREE FOREVER
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide max-w-3xl"
            >
              LEARN BY DOING.{" "}
              <span className="bg-gradient-to-r from-apprenti-violet-on-dark via-apprenti-magenta to-apprenti-cyan bg-clip-text text-transparent animate-gradient">
                GROW THROUGH MENTORSHIP.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg md:text-xl font-semibold text-foreground max-w-2xl"
            >
              You follow the path. A mentor confirms you've got it.
            </motion.p>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              apprenti.dev is a free apprenticeship app that works fully
              offline. Your curriculum, your work, and your mentor's
              feedback live as plain files you own — not locked inside
              someone else's server.
            </motion.p>

            {/* Quick highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 w-full max-w-2xl"
            >
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div key={index} className="flex flex-col items-center lg:items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="h-4 w-4 text-apprenti-cyan" />
                    </div>
                    <p className="text-sm font-semibold">{highlight.label}</p>
                    <p className="text-xs text-muted-foreground">{highlight.desc}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* AI assistance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.31 }}
              className="flex flex-col items-center lg:items-start gap-3 w-full pt-4"
            >
              <span className="text-xs text-muted-foreground/50 uppercase tracking-widest font-semibold">
                AI assistance
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-apprenti-magenta/30 bg-apprenti-magenta/10 px-3 py-1 text-xs font-medium text-apprenti-magenta">
                  <Bot className="h-3 w-3" />
                  Explain · Hint · Quiz
                </span>
                <span className={PLATFORM_BADGE_CLASS}>Local models</span>
                <span className={PLATFORM_BADGE_CLASS}>or your choice of cloud</span>
              </div>
            </motion.div>

            {/* Supported platforms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-col items-center lg:items-start gap-3 w-full pt-4"
            >
              <span className="text-xs text-muted-foreground/50 uppercase tracking-widest font-semibold">
                Supported platforms
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {PLATFORMS.map((platform) => (
                  <span key={platform} className={PLATFORM_BADGE_CLASS}>
                    {platform}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground">— coming soon</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Screenshot carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-8 bg-apprenti-violet/10 dark:bg-apprenti-violet/20 rounded-full blur-[80px] animate-pulse-glow" />

            <div className="relative">
              {/* Carousel */}
              <div className="w-64 md:w-72 overflow-hidden rounded-[2rem] shadow-xl shadow-apprenti-violet/15 dark:shadow-apprenti-violet/20 border border-apprenti-violet/10 dark:border-apprenti-violet/10 bg-white dark:bg-zinc-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${currentIndex}-${isDark}`}
                    src={getImgSrc(heroScreenshots[currentIndex])}
                    alt={heroScreenshots[currentIndex].alt}
                    className="w-full cursor-pointer block"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setLightboxOpen(true)}
                  />
                </AnimatePresence>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded-full bg-apprenti-violet/20 hover:bg-apprenti-violet/40 transition-colors text-foreground"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-2">
                  {heroScreenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                        ? "bg-apprenti-cyan w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                      aria-label={`Go to screenshot ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded-full bg-apprenti-violet/20 hover:bg-apprenti-violet/40 transition-colors text-foreground"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={heroScreenshots.map((s) => ({ src: getImgSrc(s), alt: s.alt, caption: s.caption }))}
        initialIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
