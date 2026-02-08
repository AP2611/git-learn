import { motion } from "framer-motion";
import CommitNode from "../CommitNode";
import BranchLine from "../BranchLine";

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" },
  }),
};

const HeroSection = () => {
  const gitLetters = "Git".split("");
  const githubLetters = "GitHub".split("");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Animated radial glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating git graph background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-10" viewBox="0 0 800 600">
          <BranchLine x1={100} y1={100} x2={300} y2={100} color="hsl(var(--git-green))" delay={0.5} />
          <BranchLine x1={300} y1={100} x2={500} y2={100} color="hsl(var(--git-green))" delay={0.8} />
          <BranchLine x1={300} y1={100} x2={400} y2={200} color="hsl(var(--git-blue))" delay={1} curved />
          <BranchLine x1={400} y1={200} x2={600} y2={200} color="hsl(var(--git-blue))" delay={1.2} />
          <BranchLine x1={500} y1={100} x2={700} y2={100} color="hsl(var(--git-green))" delay={1.4} />
          <BranchLine x1={600} y1={200} x2={700} y2={100} color="hsl(var(--git-blue))" delay={1.6} curved />

          {/* Additional floating branches */}
          <BranchLine x1={100} y1={400} x2={250} y2={400} color="hsl(var(--git-purple))" delay={2} />
          <BranchLine x1={250} y1={400} x2={350} y2={500} color="hsl(var(--git-orange))" delay={2.2} curved />
          <BranchLine x1={350} y1={500} x2={550} y2={500} color="hsl(var(--git-orange))" delay={2.4} />
          <BranchLine x1={550} y1={500} x2={650} y2={400} color="hsl(var(--git-purple))" delay={2.6} curved />

          <CommitNode x={100} y={100} color="hsl(var(--git-green))" label="c1" delay={0.3} />
          <CommitNode x={300} y={100} color="hsl(var(--git-green))" label="c2" delay={0.6} />
          <CommitNode x={500} y={100} color="hsl(var(--git-green))" label="c4" delay={1} />
          <CommitNode x={700} y={100} color="hsl(var(--git-green))" label="c5" delay={1.5} glow />
          <CommitNode x={400} y={200} color="hsl(var(--git-blue))" label="c3" delay={1.1} />
          <CommitNode x={600} y={200} color="hsl(var(--git-blue))" label="c6" delay={1.3} />

          <CommitNode x={100} y={400} color="hsl(var(--git-purple))" label="p1" delay={1.9} />
          <CommitNode x={250} y={400} color="hsl(var(--git-purple))" label="p2" delay={2.1} />
          <CommitNode x={350} y={500} color="hsl(var(--git-orange))" label="f1" delay={2.3} />
          <CommitNode x={550} y={500} color="hsl(var(--git-orange))" label="f2" delay={2.5} />
          <CommitNode x={650} y={400} color="hsl(var(--git-purple))" label="M" delay={2.7} glow />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.span
            className="inline-block font-mono text-sm px-4 py-1.5 rounded-full border border-primary/30 text-primary glow-text mb-8"
            animate={{ boxShadow: ["0 0 10px hsl(var(--primary) / 0.1)", "0 0 30px hsl(var(--primary) / 0.3)", "0 0 10px hsl(var(--primary) / 0.1)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎮 Interactive Learning Experience
          </motion.span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 font-display overflow-hidden">
          <motion.span
            className="inline-block mr-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn
          </motion.span>
          {gitLetters.map((letter, i) => (
            <motion.span
              key={`git-${i}`}
              className="inline-block text-primary glow-text"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span
            className="inline-block mx-3 text-muted-foreground"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            &
          </motion.span>
          {githubLetters.map((letter, i) => (
            <motion.span
              key={`github-${i}`}
              className="inline-block text-accent glow-accent"
              custom={i + 4}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Master version control through{" "}
          <span className="text-primary font-semibold">hands-on simulations</span> and{" "}
          <span className="text-accent font-semibold">interactive visualizations</span>.
          Build, branch, merge, and push — all right here.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.a
            href="#playground"
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold font-display inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 Try the Sandbox
          </motion.a>
          <motion.a
            href="#git-init"
            className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold font-display"
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start from Basics →
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-8 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {[
            { label: "Concepts", value: "6+" },
            { label: "Simulations", value: "3" },
            { label: "Interactive", value: "100%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <div className="font-display font-bold text-2xl text-primary">{stat.value}</div>
              <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
