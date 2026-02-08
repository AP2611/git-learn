import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import TerminalWindow from "../TerminalWindow";

const steps = [
  { icon: "🍴", title: "Fork", desc: "Copy someone's repository to your GitHub account", color: "var(--git-orange)" },
  { icon: "📥", title: "Clone", desc: "Download the forked repo to your local machine", color: "var(--git-blue)" },
  { icon: "🌿", title: "Branch", desc: "Create a branch for your changes", color: "var(--git-green)" },
  { icon: "✏️", title: "Commit", desc: "Make and commit your changes", color: "var(--git-yellow)" },
  { icon: "⬆️", title: "Push", desc: "Push your branch to your fork on GitHub", color: "var(--git-cyan)" },
  { icon: "🔀", title: "Pull Request", desc: "Propose your changes to the original repo", color: "var(--git-purple)" },
];

const GitHubFlowSection = () => (
  <SectionWrapper id="github-flow">
    <motion.span
      className="text-git-purple font-mono text-sm mb-4 block text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      06 — GitHub Workflow
    </motion.span>
    <motion.h2
      className="section-heading text-foreground mb-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      The <span className="text-git-purple">Pull Request</span> Flow
    </motion.h2>
    <motion.p
      className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
    >
      The standard workflow for contributing to open-source projects on GitHub.
    </motion.p>

    {/* Steps */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          className="rounded-xl border border-border bg-card p-6 relative overflow-hidden group hover:border-primary/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{step.icon}</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              Step {i + 1}
            </span>
          </div>
          <h3 className="font-display font-bold text-lg mb-1" style={{ color: `hsl(${step.color})` }}>
            {step.title}
          </h3>
          <p className="text-muted-foreground text-sm">{step.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="flex justify-center">
      <TerminalWindow
        commands={[
          { command: "git clone https://github.com/you/forked-repo.git" },
          { command: "git checkout -b fix-typo", output: "Switched to a new branch 'fix-typo'" },
          { command: 'git commit -m "Fix typo in README"' },
          { command: "git push origin fix-typo", output: "remote: Create a pull request for 'fix-typo':\nremote: https://github.com/original/repo/pull/new/fix-typo" },
        ]}
        title="github-flow"
        delay={0.3}
      />
    </div>
  </SectionWrapper>
);

export default GitHubFlowSection;
