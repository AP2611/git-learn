import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

type PRStep = "idle" | "forked" | "cloned" | "branched" | "committed" | "pushed" | "pr-opened" | "reviewed" | "merged";

const stepInfo: Record<PRStep, { title: string; desc: string; icon: string; color: string }> = {
  idle: { title: "Start", desc: "Find a repository you want to contribute to", icon: "🔍", color: "var(--muted-foreground)" },
  forked: { title: "Forked!", desc: "Repository copied to your GitHub account", icon: "🍴", color: "var(--git-orange)" },
  cloned: { title: "Cloned!", desc: "Repository downloaded to your local machine", icon: "📥", color: "var(--git-blue)" },
  branched: { title: "Branched!", desc: "Created a new branch for your changes", icon: "🌿", color: "var(--git-green)" },
  committed: { title: "Committed!", desc: "Your changes are saved locally", icon: "✅", color: "var(--git-yellow)" },
  pushed: { title: "Pushed!", desc: "Your branch is now on GitHub", icon: "⬆️", color: "var(--git-cyan)" },
  "pr-opened": { title: "PR Opened!", desc: "Pull request created — awaiting review", icon: "🔀", color: "var(--git-purple)" },
  reviewed: { title: "Approved!", desc: "Maintainer approved your changes", icon: "👍", color: "var(--primary)" },
  merged: { title: "Merged! 🎉", desc: "Your code is now part of the project!", icon: "🏆", color: "var(--primary)" },
};

const stepOrder: PRStep[] = ["idle", "forked", "cloned", "branched", "committed", "pushed", "pr-opened", "reviewed", "merged"];

const InteractivePRFlow = () => {
  const [currentStep, setCurrentStep] = useState<PRStep>("idle");
  const [log, setLog] = useState<string[]>([
    "Welcome to the Pull Request simulator!",
    "Click 'Fork' to begin your open-source contribution.",
  ]);
  const [prTitle, setPrTitle] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [...prev.slice(-14), msg]);
  }, []);

  const currentIdx = stepOrder.indexOf(currentStep);
  const nextStep = currentIdx < stepOrder.length - 1 ? stepOrder[currentIdx + 1] : null;

  const handleAction = () => {
    if (!nextStep) return;

    switch (nextStep) {
      case "forked":
        addLog("→ Navigating to github.com/awesome-project/repo");
        addLog("→ Clicked 'Fork' button");
        addLog("✓ Forked to github.com/you/repo");
        break;
      case "cloned":
        addLog("$ git clone https://github.com/you/repo.git");
        addLog("Cloning into 'repo'...");
        addLog("✓ Repository cloned successfully");
        break;
      case "branched":
        addLog("$ git checkout -b fix-awesome-feature");
        addLog("Switched to a new branch 'fix-awesome-feature'");
        break;
      case "committed":
        const msg = commitMessage || "Fix awesome feature";
        addLog(`$ git add .`);
        addLog(`$ git commit -m "${msg}"`);
        addLog(`[fix-awesome-feature abc1234] ${msg}`);
        setCommitMessage("");
        break;
      case "pushed":
        addLog("$ git push origin fix-awesome-feature");
        addLog("Enumerating objects: 5, done.");
        addLog("✓ Branch pushed to your fork");
        break;
      case "pr-opened":
        const title = prTitle || "Fix awesome feature";
        addLog(`→ Opening PR: "${title}"`);
        addLog("→ base: main ← compare: fix-awesome-feature");
        addLog("✓ Pull Request #42 created!");
        setPrTitle("");
        break;
      case "reviewed":
        const comment = reviewComment || "LGTM! Great work 🎉";
        addLog(`[maintainer] Review: "${comment}"`);
        addLog("✓ Changes approved!");
        setReviewComment("");
        break;
      case "merged":
        addLog("→ Maintainer clicked 'Merge pull request'");
        addLog("✓ Pull request #42 merged!");
        addLog("🎉 Congratulations! You're an open-source contributor!");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        break;
    }

    setCurrentStep(nextStep);
  };

  const handleReset = () => {
    setCurrentStep("idle");
    setLog([
      "Welcome to the Pull Request simulator!",
      "Click 'Fork' to begin your open-source contribution.",
    ]);
    setPrTitle("");
    setCommitMessage("");
    setReviewComment("");
    setShowConfetti(false);
  };

  const getActionLabel = () => {
    switch (nextStep) {
      case "forked": return "🍴 Fork Repository";
      case "cloned": return "📥 Clone to Local";
      case "branched": return "🌿 Create Branch";
      case "committed": return "✅ Commit Changes";
      case "pushed": return "⬆️ Push to GitHub";
      case "pr-opened": return "🔀 Open Pull Request";
      case "reviewed": return "👍 Approve Review";
      case "merged": return "🏆 Merge PR!";
      default: return null;
    }
  };

  const info = stepInfo[currentStep];

  return (
    <SectionWrapper id="pr-simulator">
      <motion.span
        className="text-git-purple font-mono text-sm mb-4 block text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🔀 Pull Request Simulator
      </motion.span>
      <motion.h2
        className="section-heading text-foreground mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Mock <span className="text-git-purple">Pull Request</span>
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Walk through the entire pull request workflow step by step. Fork, clone, branch, commit, push, and open a PR!
      </motion.p>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          {/* Background line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          {/* Progress line */}
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2"
            style={{ background: `hsl(var(--primary))` }}
            animate={{ width: `${(currentIdx / (stepOrder.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {stepOrder.map((step, i) => {
            const s = stepInfo[step];
            const isCompleted = i <= currentIdx;
            const isCurrent = step === currentStep;
            return (
              <motion.div
                key={step}
                className="relative z-10 flex flex-col items-center"
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={isCurrent ? { duration: 1, repeat: Infinity } : {}}
              >
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base border-2 transition-all duration-300"
                  style={{
                    borderColor: isCompleted ? `hsl(${s.color})` : `hsl(var(--border))`,
                    background: isCompleted ? `hsl(${s.color} / 0.2)` : `hsl(var(--card))`,
                  }}
                >
                  {s.icon}
                </div>
                <span className="text-[10px] font-mono mt-1 text-muted-foreground hidden md:block">
                  {s.title.replace("!", "")}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current step card */}
        <motion.div
          className="rounded-xl border-2 bg-card p-8 relative overflow-hidden"
          style={{ borderColor: `hsl(${info.color})` }}
          key={currentStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Confetti */}
          <AnimatePresence>
            {showConfetti && (
              <>
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: `hsl(${CONFETTI_COLORS[i % CONFETTI_COLORS.length]})`,
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ top: "50%", opacity: 1, scale: 1 }}
                    animate={{
                      top: `${-20 + Math.random() * 120}%`,
                      x: (Math.random() - 0.5) * 200,
                      opacity: 0,
                      scale: 0,
                      rotate: Math.random() * 360,
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          <div className="text-5xl mb-4">{info.icon}</div>
          <h3
            className="font-display font-bold text-2xl mb-2"
            style={{ color: `hsl(${info.color})` }}
          >
            {info.title}
          </h3>
          <p className="text-muted-foreground mb-6">{info.desc}</p>

          {/* Contextual input for certain steps */}
          {nextStep === "committed" && (
            <input
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Enter your commit message..."
              className="w-full px-4 py-2 rounded-lg bg-muted text-foreground font-mono text-sm border border-border focus:outline-none focus:border-primary/50 mb-4"
            />
          )}
          {nextStep === "pr-opened" && (
            <input
              type="text"
              value={prTitle}
              onChange={(e) => setPrTitle(e.target.value)}
              placeholder="Enter your PR title..."
              className="w-full px-4 py-2 rounded-lg bg-muted text-foreground font-mono text-sm border border-border focus:outline-none focus:border-git-purple/50 mb-4"
            />
          )}
          {nextStep === "reviewed" && (
            <input
              type="text"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Maintainer review comment..."
              className="w-full px-4 py-2 rounded-lg bg-muted text-foreground font-mono text-sm border border-border focus:outline-none focus:border-primary/50 mb-4"
            />
          )}

          <div className="flex gap-3">
            {nextStep && (
              <motion.button
                onClick={handleAction}
                className="px-6 py-3 rounded-xl font-display font-bold text-sm transition-all border-2"
                style={{
                  borderColor: `hsl(${stepInfo[nextStep].color})`,
                  color: `hsl(${stepInfo[nextStep].color})`,
                  background: `hsl(${stepInfo[nextStep].color} / 0.1)`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getActionLabel()}
              </motion.button>
            )}
            {currentStep !== "idle" && (
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-xl font-mono text-xs text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
        </motion.div>

        {/* Terminal log */}
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot bg-git-red" />
            <div className="terminal-dot bg-git-yellow" />
            <div className="terminal-dot bg-git-green" />
            <span className="ml-3 text-xs font-mono text-muted-foreground">PR flow</span>
          </div>
          <div className="terminal-body space-y-1 max-h-[350px] overflow-y-auto">
            <AnimatePresence>
              {log.map((line, i) => (
                <motion.div
                  key={`${i}-${line}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs ${
                    line.startsWith("$") ? "text-foreground" :
                    line.startsWith("✓") ? "text-git-green" :
                    line.startsWith("→") ? "text-accent" :
                    line.startsWith("🎉") ? "text-git-yellow" :
                    line.startsWith("[maintainer]") ? "text-git-purple" :
                    "text-muted-foreground"
                  }`}
                >
                  {line.startsWith("$") ? (
                    <>
                      <span className="text-git-green">$ </span>
                      <span>{line.substring(2)}</span>
                    </>
                  ) : (
                    <span className="ml-2">{line}</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const CONFETTI_COLORS = [
  "var(--git-green)", "var(--git-blue)", "var(--git-purple)",
  "var(--git-orange)", "var(--git-yellow)", "var(--git-cyan)",
];

export default InteractivePRFlow;
