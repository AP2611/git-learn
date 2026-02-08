import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import TerminalWindow from "../TerminalWindow";
import CommitNode from "../CommitNode";
import BranchLine from "../BranchLine";

const MergingSection = () => (
  <SectionWrapper id="merging">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <motion.span
          className="text-git-purple font-mono text-sm mb-4 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          04 — Bringing It Together
        </motion.span>
        <motion.h2
          className="section-heading text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-git-purple">merge</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Merging combines the work from different branches back together. 
          Git intelligently combines changes — and tells you when it needs help resolving conflicts.
        </motion.p>

        <TerminalWindow
          commands={[
            { command: "git checkout main", output: "Switched to branch 'main'" },
            { command: "git merge feature", output: "Merge made by the 'ort' strategy.\n app.js | 15 +++++++++\n 1 file changed, 15 insertions(+)" },
          ]}
          title="merging"
          delay={0.4}
        />
      </div>

      <motion.div
        className="rounded-xl border border-border bg-card p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <svg viewBox="0 0 500 280" className="w-full">
          {/* Main branch */}
          <BranchLine x1={50} y1={80} x2={150} y2={80} color="hsl(var(--git-green))" delay={0.2} />
          <BranchLine x1={150} y1={80} x2={280} y2={80} color="hsl(var(--git-green))" delay={0.5} />
          <BranchLine x1={280} y1={80} x2={420} y2={80} color="hsl(var(--git-green))" delay={1.6} />

          {/* Feature branch split */}
          <BranchLine x1={150} y1={80} x2={220} y2={180} color="hsl(var(--git-blue))" delay={0.6} curved />
          <BranchLine x1={220} y1={180} x2={340} y2={180} color="hsl(var(--git-blue))" delay={0.8} />

          {/* Merge line */}
          <BranchLine x1={340} y1={180} x2={420} y2={80} color="hsl(var(--git-purple))" delay={1.3} curved />

          {/* Nodes */}
          <CommitNode x={50} y={80} color="hsl(var(--git-green))" label="c1" delay={0.1} />
          <CommitNode x={150} y={80} color="hsl(var(--git-green))" label="c2" delay={0.4} />
          <CommitNode x={280} y={80} color="hsl(var(--git-green))" label="c3" delay={0.7} />
          <CommitNode x={220} y={180} color="hsl(var(--git-blue))" label="f1" delay={0.7} />
          <CommitNode x={340} y={180} color="hsl(var(--git-blue))" label="f2" delay={0.9} />

          {/* Merge commit */}
          <CommitNode x={420} y={80} color="hsl(var(--git-purple))" label="M" delay={1.5} size={46} glow />

          {/* Labels */}
          <motion.text x={420} y={45} textAnchor="middle" fill="hsl(var(--git-purple))" fontSize={12} fontFamily="JetBrains Mono" fontWeight={600}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.7 }} viewport={{ once: true }}>
            merge commit
          </motion.text>
        </svg>
      </motion.div>
    </div>
  </SectionWrapper>
);

export default MergingSection;
