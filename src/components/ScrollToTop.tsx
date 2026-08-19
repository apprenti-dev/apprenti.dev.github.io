import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-apprenti-violet/80 hover:bg-apprenti-violet text-white shadow-lg shadow-apprenti-violet/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5" />
        </button>
    );
}
