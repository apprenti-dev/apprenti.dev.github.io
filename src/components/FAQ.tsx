import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is apprenti.dev, and is it an LMS?",
    answer:
      "apprenti.dev is a Git-native, offline-first, AI-assisted apprenticeship app for two roles — apprentices who do the work and mentors who review it. It's deliberately not an LMS: there's no course catalog, no quiz-and-certificate model, and no backend deciding what 'done' means. Progress is evidence you produced, reviewed by a person you know.",
  },
  {
    question: "How does \"Git-native, no backend\" work if I'm not a technical mentor?",
    answer:
      "The app hides Git's mechanics behind ordinary actions — 'Sync,' 'Publish,' 'Approve' — while a Git repository does the actual persisting, syncing, and history-keeping underneath. Mentors and apprentices interact with tasks, reviews, and messages, never raw Git commands.",
  },
  {
    question: "Is apprenti.dev free?",
    answer:
      "Yes. There are no pricing tiers. Because there's no backend to operate and AI runs on a provider key you supply, the product has no ongoing cost to pass on to you.",
  },
  {
    question: "What platforms does it run on?",
    answer: "Android, iOS, Windows, macOS, and Linux, from one Flutter codebase.",
  },
  {
    question: "Is there a marketplace of curricula, or can I write my own?",
    answer:
      "There's no marketplace — curricula are Git repositories. The first official path is the Software Engineering apprenticeship, and it's built to be forked or extended. You (or a mentor) can also author an entirely new, curriculum-agnostic path using apprenti creator, the companion authoring studio.",
  },
  {
    question: "How does AI assistance work, and is my data private?",
    answer:
      "AI is assistive, never authoritative — it can explain, hint, quiz, or coach reflection, but it never auto-approves your work, and every task can restrict or expand what AI is allowed to do. You choose local (fully on-device, nothing leaves your machine) or a cloud provider — the interface always labels which one is active, and cloud AI is only ever called if you've selected it. API keys never touch Git, markdown, or logs.",
  },
  {
    question: "What's the relationship between apprenti (the app) and apprenti creator (the authoring tool)?",
    answer:
      "apprenti is the runtime apprentices and mentors use day to day. apprenti creator is a separate VS Code extension for designing and maintaining curricula — a visual path canvas and entity editors instead of hand-edited JSON. Both read and write the exact same Git files; neither introduces a second format or a hidden database.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-apprenti-violet-on-dark to-apprenti-cyan bg-clip-text text-transparent">
              questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to know about apprenti.dev
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
