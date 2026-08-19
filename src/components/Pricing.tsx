import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "No backend to fund",
  "Bring your own AI key",
  "Fork anytime, no lock-in",
];

export function FreeAndOpen() {
  return (
    <section id="free-and-open" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Free.{" "}
            <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
              No tiers.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            apprenti.dev is free — no tiers, no subscription. There's no
            backend to run and no hosting to fund: Git is already free, your
            repository is already yours, and any AI cost is a provider key
            you bring and control yourself, not a markup we charge. Because
            everything durable is a plain Git repository, you can fork the
            app's curriculum or the ecosystem itself at any time — there's no
            platform to be locked into.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl border border-border/50 bg-card text-left sm:inline-flex sm:flex-col sm:text-left"
          >
            <div className="space-y-3">
              {reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-apprenti-cyan shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
