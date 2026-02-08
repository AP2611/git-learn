import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import TerminalWindow from "../TerminalWindow";

const RemoteSection = () => (
  <SectionWrapper id="remote">
    <motion.span
      className="text-accent font-mono text-sm mb-4 block text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      05 — Collaboration
    </motion.span>
    <motion.h2
      className="section-heading text-foreground mb-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="text-accent">push</span> & <span className="text-git-orange">pull</span>
    </motion.h2>
    <motion.p
      className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
    >
      Connect your local repository to GitHub and collaborate with others. Push your changes 
      up, and pull down changes from your team.
    </motion.p>

    {/* Push/Pull visualization */}
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Local */}
      <motion.div
        className="rounded-xl border border-border bg-card p-8 text-center"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-4xl mb-4">💻</div>
        <h3 className="font-display font-bold text-xl text-foreground mb-2">Local Repository</h3>
        <p className="text-muted-foreground text-sm mb-4">Your machine</p>
        <div className="space-y-2">
          {["c1: Initial commit", "c2: Add styles", "c3: Add features"].map((c, i) => (
            <motion.div
              key={c}
              className="font-mono text-xs px-3 py-2 rounded bg-muted text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
            >
              {c}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Remote */}
      <motion.div
        className="rounded-xl border border-border bg-card p-8 text-center"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-4xl mb-4">☁️</div>
        <h3 className="font-display font-bold text-xl text-foreground mb-2">Remote (GitHub)</h3>
        <p className="text-muted-foreground text-sm mb-4">Cloud-hosted</p>
        <div className="space-y-2">
          {["c1: Initial commit", "c2: Add styles"].map((c, i) => (
            <motion.div
              key={c}
              className="font-mono text-xs px-3 py-2 rounded bg-muted text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
            >
              {c}
            </motion.div>
          ))}
          <motion.div
            className="font-mono text-xs px-3 py-2 rounded border-2 border-dashed border-accent/30 text-accent"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            viewport={{ once: true }}
          >
            ← c3: Add features (incoming push)
          </motion.div>
        </div>
      </motion.div>
    </div>

    {/* Animated arrows */}
    <div className="flex justify-center gap-16 mb-12">
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-accent text-3xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ⬆
        </motion.div>
        <span className="font-mono text-sm text-accent">git push</span>
      </motion.div>
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-git-orange text-3xl"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ⬇
        </motion.div>
        <span className="font-mono text-sm text-git-orange">git pull</span>
      </motion.div>
    </div>

    <div className="flex justify-center">
      <TerminalWindow
        commands={[
          { command: "git remote add origin https://github.com/you/repo.git" },
          { command: "git push -u origin main", output: "Enumerating objects: 9, done.\nTo https://github.com/you/repo.git\n * [new branch]  main -> main" },
          { command: "git pull origin main", output: "Already up to date." },
        ]}
        title="remote"
        delay={0.5}
      />
    </div>
  </SectionWrapper>
);

export default RemoteSection;
