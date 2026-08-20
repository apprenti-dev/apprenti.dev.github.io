import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

const YOUTUBE_ID = "laySY2Opcck";
const THUMBNAIL_SRC = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const THUMBNAIL_FALLBACK = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;

export function ProductDemo() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <section id="demo" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        See it{" "}
                        <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
                            in action
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        A short walkthrough of apprenti.dev — the path, a task, and a
                        mentor review, end to end.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-xl shadow-apprenti-violet/10 bg-muted"
                >
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="group absolute inset-0 w-full h-full"
                        aria-label="Play the apprenti.dev product demo"
                    >
                        <img
                            src={THUMBNAIL_SRC}
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = THUMBNAIL_FALLBACK;
                            }}
                            alt="apprenti.dev product demo thumbnail"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-apprenti-midnight/30 group-hover:bg-apprenti-midnight/40 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-apprenti-violet to-apprenti-magenta shadow-lg shadow-apprenti-violet/40 group-hover:scale-110 transition-transform">
                                <Play className="h-7 w-7 md:h-8 md:w-8 text-white fill-white ml-0.5" />
                            </div>
                        </div>
                    </button>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-apprenti-midnight/90 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-[92vw] max-w-6xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="absolute -top-10 right-0 md:-right-2 md:-top-12 text-white/80 hover:text-white transition-colors"
                                aria-label="Close video"
                            >
                                <X className="h-8 w-8" />
                            </button>
                            <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1`}
                                    title="apprenti.dev product demo"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
