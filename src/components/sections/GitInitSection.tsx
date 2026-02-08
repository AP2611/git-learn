import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import TerminalWindow from "../TerminalWindow";

const GitInitSection = () => (
  <SectionWrapper id="git-init">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <motion.span
          className="text-primary font-mono text-sm mb-4 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          01 — Getting Started
        </motion.span>
        <motion.h2
          className="section-heading text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          git <span className="text-primary">init</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Every Git journey starts here. <code className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">git init</code> creates 
          a new repository — an invisible <code className="font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">.git</code> folder 
          that tracks every change you'll ever make.
        </motion.p>
        <motion.div
          className="flex items-center gap-3 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          Think of it as installing a "time machine" for your project
        </motion.div>
      </div>

      <div className="flex flex-col gap-6">
        <TerminalWindow
          commands={[
            { command: "mkdir my-project", output: "" },
            { command: "cd my-project" },
            { command: "git init", output: "Initialized empty Git repository in /my-project/.git/" },
          ]}
          delay={0.3}
        />

        {/* Animated folder structure */}
        <motion.div
          className="terminal-window p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm space-y-1">
            <div className="text-foreground">📁 my-project/</div>
            <motion.div
              className="ml-4 text-primary"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              📁 .git/
            </motion.div>
            {[
              { name: "HEAD", delay: 1.4 },
              { name: "config", delay: 1.5 },
              { name: "objects/", delay: 1.6 },
              { name: "refs/", delay: 1.7 },
            ].map((item) => (
              <motion.div
                key={item.name}
                className="ml-8 text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay }}
                viewport={{ once: true }}
              >
                📄 {item.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </SectionWrapper>
);

export default GitInitSection;
