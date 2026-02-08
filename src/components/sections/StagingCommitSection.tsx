import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import TerminalWindow from "../TerminalWindow";

const stagingAreas = [
  { label: "Working Directory", color: "var(--git-orange)", files: ["index.html", "style.css", "app.js"], icon: "📝" },
  { label: "Staging Area", color: "var(--git-yellow)", files: ["index.html", "style.css"], icon: "📦" },
  { label: "Repository", color: "var(--git-green)", files: ["commit a1b2c3"], icon: "✅" },
];

const StagingCommitSection = () => (
  <SectionWrapper id="staging">
    <motion.span
      className="text-accent font-mono text-sm mb-4 block text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      02 — The Three Areas
    </motion.span>
    <motion.h2
      className="section-heading text-foreground mb-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="text-git-orange">add</span> & <span className="text-primary">commit</span>
    </motion.h2>
    <motion.p
      className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
    >
      Git uses three areas to manage your changes. Files flow from your working directory,
      through staging, and into the repository.
    </motion.p>

    {/* Three areas visualization */}
    <div className="grid md:grid-cols-3 gap-6 mb-16">
      {stagingAreas.map((area, i) => (
        <motion.div
          key={area.label}
          className="rounded-xl border border-border p-6 bg-card relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          viewport={{ once: true }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `hsl(${area.color})` }}
          />
          <div className="text-3xl mb-3">{area.icon}</div>
          <h3
            className="font-display font-bold text-lg mb-4"
            style={{ color: `hsl(${area.color})` }}
          >
            {area.label}
          </h3>
          <div className="space-y-2">
            {area.files.map((file, j) => (
              <motion.div
                key={file}
                className="font-mono text-sm px-3 py-1.5 rounded bg-muted text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 + j * 0.15 + 0.3 }}
                viewport={{ once: true }}
              >
                {file}
              </motion.div>
            ))}
          </div>
          {i < 2 && (
            <motion.div
              className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 text-muted-foreground text-2xl z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.5 }}
              viewport={{ once: true }}
            >
              →
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>

    <div className="flex justify-center">
      <TerminalWindow
        commands={[
          { command: "git add index.html style.css", output: "" },
          { command: "git status", output: "Changes to be committed:\n  new file: index.html\n  new file: style.css" },
          { command: 'git commit -m "Initial commit"', output: "[main (root-commit) a1b2c3d] Initial commit\n 2 files changed, 42 insertions(+)" },
        ]}
        delay={0.5}
      />
    </div>
  </SectionWrapper>
);

export default StagingCommitSection;
