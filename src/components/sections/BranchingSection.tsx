import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import TerminalWindow from "../TerminalWindow";
import CommitNode from "../CommitNode";
import BranchLine from "../BranchLine";

const BranchingSection = () => (
  <SectionWrapper id="branching">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        {/* Branch graph */}
        <motion.div
          className="rounded-xl border border-border bg-card p-8 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <svg viewBox="0 0 500 250" className="w-full">
            {/* Main branch */}
            <BranchLine x1={50} y1={80} x2={150} y2={80} color="hsl(var(--git-green))" delay={0.2} />
            <BranchLine x1={150} y1={80} x2={250} y2={80} color="hsl(var(--git-green))" delay={0.5} />
            <BranchLine x1={250} y1={80} x2={400} y2={80} color="hsl(var(--git-green))" delay={1.2} />

            {/* Feature branch */}
            <BranchLine x1={150} y1={80} x2={220} y2={170} color="hsl(var(--git-blue))" delay={0.7} curved />
            <BranchLine x1={220} y1={170} x2={330} y2={170} color="hsl(var(--git-blue))" delay={0.9} />

            {/* Nodes */}
            <CommitNode x={50} y={80} color="hsl(var(--git-green))" label="c1" delay={0.1} />
            <CommitNode x={150} y={80} color="hsl(var(--git-green))" label="c2" delay={0.4} />
            <CommitNode x={250} y={80} color="hsl(var(--git-green))" label="c3" delay={0.8} />
            <CommitNode x={400} y={80} color="hsl(var(--git-green))" label="c4" delay={1.3} glow />
            <CommitNode x={220} y={170} color="hsl(var(--git-blue))" label="f1" delay={0.8} />
            <CommitNode x={330} y={170} color="hsl(var(--git-blue))" label="f2" delay={1.0} glow />

            {/* Labels */}
            <motion.text
              x={400} y={50}
              textAnchor="middle"
              fill="hsl(var(--git-green))"
              fontSize={12}
              fontFamily="JetBrains Mono"
              fontWeight={600}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              viewport={{ once: true }}
            >
              main
            </motion.text>
            <motion.text
              x={330} y={200}
              textAnchor="middle"
              fill="hsl(var(--git-blue))"
              fontSize={12}
              fontFamily="JetBrains Mono"
              fontWeight={600}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              viewport={{ once: true }}
            >
              feature
            </motion.text>
          </svg>
        </motion.div>
      </div>

      <div className="order-1 md:order-2">
        <motion.span
          className="text-git-blue font-mono text-sm mb-4 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          03 — Parallel Universes
        </motion.span>
        <motion.h2
          className="section-heading text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-git-blue">branch</span>ing
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Branches let you work on different features simultaneously without conflicts. 
          Create a branch, make changes, and merge back when ready.
        </motion.p>

        <TerminalWindow
          commands={[
            { command: "git branch feature", output: "" },
            { command: "git checkout feature", output: "Switched to branch 'feature'" },
            { command: "git checkout -b feature", output: "Switched to a new branch 'feature'\n(shortcut: create + switch)" },
          ]}
          title="branching"
          delay={0.4}
        />
      </div>
    </div>
  </SectionWrapper>
);

export default BranchingSection;
