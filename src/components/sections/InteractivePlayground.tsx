import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

interface Commit {
  id: string;
  message: string;
  branch: string;
  hash: string;
}

interface Branch {
  name: string;
  color: string;
}

const COLORS = [
  "var(--git-green)",
  "var(--git-blue)",
  "var(--git-purple)",
  "var(--git-orange)",
  "var(--git-cyan)",
];

const generateHash = () => Math.random().toString(36).substring(2, 9);

const InteractivePlayground = () => {
  const [branches, setBranches] = useState<Branch[]>([
    { name: "main", color: COLORS[0] },
  ]);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [commits, setCommits] = useState<Commit[]>([
    { id: "1", message: "Initial commit", branch: "main", hash: generateHash() },
  ]);
  const [commitMsg, setCommitMsg] = useState("");
  const [newBranchName, setNewBranchName] = useState("");
  const [log, setLog] = useState<string[]>(["$ git init", "Initialized empty Git repository"]);
  const [mergedBranches, setMergedBranches] = useState<{ from: string; to: string; atCommit: string }[]>([]);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [workingFiles, setWorkingFiles] = useState<string[]>(["README.md"]);

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [...prev.slice(-15), msg]);
  }, []);

  const handleAddFile = () => {
    const files = ["index.html", "style.css", "app.js", "utils.ts", "config.json", "package.json", "server.ts", "api.ts"];
    const available = files.filter((f) => !workingFiles.includes(f) && !stagedFiles.includes(f));
    if (available.length === 0) return;
    const file = available[Math.floor(Math.random() * available.length)];
    setWorkingFiles((prev) => [...prev, file]);
    addLog(`$ echo "content" > ${file}`);
    addLog(`Created ${file}`);
  };

  const handleStage = () => {
    if (workingFiles.length === 0) {
      addLog("$ git add .");
      addLog("nothing to add");
      return;
    }
    addLog(`$ git add .`);
    addLog(`Staged: ${workingFiles.join(", ")}`);
    setStagedFiles((prev) => [...prev, ...workingFiles]);
    setWorkingFiles([]);
  };

  const handleCommit = () => {
    if (stagedFiles.length === 0 && !commitMsg) {
      addLog("$ git commit");
      addLog("nothing to commit, working tree clean");
      return;
    }
    const msg = commitMsg || `Update ${stagedFiles[0] || "files"}`;
    const hash = generateHash();
    const newCommit: Commit = {
      id: String(commits.length + 1),
      message: msg,
      branch: currentBranch,
      hash,
    };
    setCommits((prev) => [...prev, newCommit]);
    addLog(`$ git commit -m "${msg}"`);
    addLog(`[${currentBranch} ${hash.substring(0, 7)}] ${msg}`);
    addLog(`${stagedFiles.length || 1} file(s) changed`);
    setCommitMsg("");
    setStagedFiles([]);
  };

  const handleCreateBranch = () => {
    const name = newBranchName.trim().replace(/\s+/g, "-").toLowerCase();
    if (!name || branches.find((b) => b.name === name)) {
      addLog(`$ git checkout -b ${name || "???"}`);
      addLog(`fatal: branch '${name}' already exists`);
      return;
    }
    const color = COLORS[branches.length % COLORS.length];
    setBranches((prev) => [...prev, { name, color }]);
    setCurrentBranch(name);
    setNewBranchName("");
    addLog(`$ git checkout -b ${name}`);
    addLog(`Switched to a new branch '${name}'`);
  };

  const handleSwitchBranch = (name: string) => {
    if (name === currentBranch) return;
    setCurrentBranch(name);
    addLog(`$ git checkout ${name}`);
    addLog(`Switched to branch '${name}'`);
  };

  const handleMerge = (fromBranch: string) => {
    if (fromBranch === currentBranch) return;
    const hash = generateHash();
    const mergeCommit: Commit = {
      id: String(commits.length + 1),
      message: `Merge '${fromBranch}' into ${currentBranch}`,
      branch: currentBranch,
      hash,
    };
    setCommits((prev) => [...prev, mergeCommit]);
    setMergedBranches((prev) => [...prev, { from: fromBranch, to: currentBranch, atCommit: mergeCommit.id }]);
    addLog(`$ git merge ${fromBranch}`);
    addLog(`Merge made by the 'ort' strategy.`);
    addLog(`[${currentBranch} ${hash.substring(0, 7)}] Merge '${fromBranch}' into ${currentBranch}`);
  };

  const branchColor = (name: string) => {
    const b = branches.find((br) => br.name === name);
    return b?.color || COLORS[0];
  };

  // Build graph data
  const branchNames = branches.map((b) => b.name);
  const branchYPositions: Record<string, number> = {};
  branchNames.forEach((name, i) => {
    branchYPositions[name] = 50 + i * 70;
  });

  const graphWidth = Math.max(500, commits.length * 80 + 80);

  return (
    <SectionWrapper id="playground">
      <motion.span
        className="text-primary font-mono text-sm mb-4 block text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🎮 Interactive Playground
      </motion.span>
      <motion.h2
        className="section-heading text-foreground mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Git <span className="text-primary">Sandbox</span>
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Create files, stage them, commit, create branches, and merge — watch the graph update in real time!
      </motion.p>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-4">
          {/* Working directory */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-mono text-sm font-bold text-git-orange mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: `hsl(var(--git-orange))` }} />
              Working Directory
            </h3>
            <div className="space-y-1 mb-3 min-h-[32px]">
              <AnimatePresence>
                {workingFiles.map((f) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="font-mono text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                  >
                    📄 {f}
                  </motion.div>
                ))}
              </AnimatePresence>
              {workingFiles.length === 0 && (
                <span className="text-xs text-muted-foreground italic">Clean</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddFile}
                className="flex-1 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground font-mono text-xs hover:bg-secondary/80 transition-colors"
              >
                + New File
              </button>
              <button
                onClick={handleStage}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-mono transition-colors"
                style={{ background: `hsl(var(--git-yellow) / 0.15)`, color: `hsl(var(--git-yellow))` }}
              >
                git add .
              </button>
            </div>
          </div>

          {/* Staging area */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-mono text-sm font-bold mb-3 flex items-center gap-2" style={{ color: `hsl(var(--git-yellow))` }}>
              <span className="w-2 h-2 rounded-full" style={{ background: `hsl(var(--git-yellow))` }} />
              Staging Area
            </h3>
            <div className="space-y-1 mb-3 min-h-[32px]">
              <AnimatePresence>
                {stagedFiles.map((f) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{ background: `hsl(var(--git-yellow) / 0.1)`, color: `hsl(var(--git-yellow))` }}
                  >
                    ✓ {f}
                  </motion.div>
                ))}
              </AnimatePresence>
              {stagedFiles.length === 0 && (
                <span className="text-xs text-muted-foreground italic">Nothing staged</span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommit()}
                placeholder="Commit message..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground font-mono text-xs border border-border focus:outline-none focus:border-primary/50"
              />
              <button
                onClick={handleCommit}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Commit
              </button>
            </div>
          </div>

          {/* Branches */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-mono text-sm font-bold text-git-blue mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: `hsl(var(--git-blue))` }} />
              Branches
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {branches.map((b) => (
                <button
                  key={b.name}
                  onClick={() => handleSwitchBranch(b.name)}
                  className="px-3 py-1 rounded-full font-mono text-xs font-bold border-2 transition-all"
                  style={{
                    borderColor: `hsl(${b.color})`,
                    background: currentBranch === b.name ? `hsl(${b.color} / 0.2)` : "transparent",
                    color: `hsl(${b.color})`,
                  }}
                >
                  {currentBranch === b.name && "● "}
                  {b.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateBranch()}
                placeholder="Branch name..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground font-mono text-xs border border-border focus:outline-none focus:border-git-blue/50"
              />
              <button
                onClick={handleCreateBranch}
                className="px-3 py-2 rounded-lg font-mono text-xs font-bold transition-colors"
                style={{ background: `hsl(var(--git-blue) / 0.15)`, color: `hsl(var(--git-blue))` }}
              >
                Branch
              </button>
            </div>
            {branches.length > 1 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Merge into <span className="text-foreground font-bold">{currentBranch}</span>:</p>
                <div className="flex flex-wrap gap-2">
                  {branches
                    .filter((b) => b.name !== currentBranch)
                    .map((b) => (
                      <button
                        key={b.name}
                        onClick={() => handleMerge(b.name)}
                        className="px-3 py-1 rounded-lg font-mono text-xs transition-colors"
                        style={{ background: `hsl(var(--git-purple) / 0.15)`, color: `hsl(var(--git-purple))` }}
                      >
                        ← merge {b.name}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Graph + Terminal */}
        <div className="lg:col-span-3 space-y-4">
          {/* Live graph */}
          <div className="rounded-xl border border-border bg-card p-5 overflow-hidden">
            <h3 className="font-mono text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Live Commit Graph
            </h3>
            <div className="overflow-x-auto">
              <svg
                viewBox={`0 0 ${graphWidth} ${Math.max(120, branches.length * 70 + 40)}`}
                className="w-full min-w-[400px]"
                style={{ minHeight: Math.max(120, branches.length * 70 + 40) }}
              >
                {/* Branch labels */}
                {branchNames.map((name) => (
                  <text
                    key={`label-${name}`}
                    x={10}
                    y={branchYPositions[name] + 4}
                    fill={`hsl(${branchColor(name)})`}
                    fontSize={10}
                    fontFamily="JetBrains Mono"
                    fontWeight={600}
                    opacity={0.5}
                  >
                    {name}
                  </text>
                ))}

                {/* Lines between commits on same branch */}
                {commits.map((commit, i) => {
                  if (i === 0) return null;
                  const prevSameBranch = [...commits].slice(0, i).reverse().find((c) => c.branch === commit.branch);
                  if (!prevSameBranch) {
                    // Find parent branch (the branch we were on when this branch was created)
                    const branchCreationIdx = commits.findIndex((c) => c.branch === commit.branch);
                    const parentCommit = branchCreationIdx > 0 ? commits[branchCreationIdx - 1] : null;
                    if (parentCommit) {
                      const parentIdx = commits.indexOf(parentCommit);
                      const x1 = 70 + parentIdx * 80;
                      const y1 = branchYPositions[parentCommit.branch];
                      const x2 = 70 + i * 80;
                      const y2 = branchYPositions[commit.branch];
                      const midX = (x1 + x2) / 2;
                      return (
                        <motion.path
                          key={`fork-${commit.id}`}
                          d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                          stroke={`hsl(${branchColor(commit.branch)})`}
                          strokeWidth={2.5}
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      );
                    }
                    return null;
                  }
                  const prevIdx = commits.indexOf(prevSameBranch);
                  const x1 = 70 + prevIdx * 80;
                  const x2 = 70 + i * 80;
                  const y = branchYPositions[commit.branch];
                  return (
                    <motion.line
                      key={`line-${commit.id}`}
                      x1={x1}
                      y1={y}
                      x2={x2}
                      y2={y}
                      stroke={`hsl(${branchColor(commit.branch)})`}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  );
                })}

                {/* Merge lines */}
                {mergedBranches.map((merge, i) => {
                  const mergeCommitIdx = commits.findIndex((c) => c.id === merge.atCommit);
                  if (mergeCommitIdx < 0) return null;
                  // Find the last commit on the source branch before the merge
                  const sourceCommits = commits.slice(0, mergeCommitIdx).filter((c) => c.branch === merge.from);
                  const lastSource = sourceCommits[sourceCommits.length - 1];
                  if (!lastSource) return null;
                  const sourceIdx = commits.indexOf(lastSource);
                  const x1 = 70 + sourceIdx * 80;
                  const y1 = branchYPositions[merge.from];
                  const x2 = 70 + mergeCommitIdx * 80;
                  const y2 = branchYPositions[merge.to];
                  const midX = (x1 + x2) / 2;
                  return (
                    <motion.path
                      key={`merge-line-${i}`}
                      d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                      stroke={`hsl(var(--git-purple))`}
                      strokeWidth={2.5}
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="6 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}

                {/* Commit nodes */}
                {commits.map((commit, i) => {
                  const x = 70 + i * 80;
                  const y = branchYPositions[commit.branch];
                  const isMerge = commit.message.startsWith("Merge");
                  const isLatest = i === commits.length - 1;
                  return (
                    <motion.g
                      key={commit.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {isLatest && (
                        <circle cx={x} cy={y} r={24} fill={`hsl(${branchColor(commit.branch)} / 0.1)`}>
                          <animate attributeName="r" values="22;28;22" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isMerge ? 18 : 15}
                        fill="hsl(var(--card))"
                        stroke={isMerge ? `hsl(var(--git-purple))` : `hsl(${branchColor(commit.branch)})`}
                        strokeWidth={2.5}
                      />
                      <text
                        x={x}
                        y={y + 1}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isMerge ? `hsl(var(--git-purple))` : `hsl(${branchColor(commit.branch)})`}
                        fontSize={8}
                        fontFamily="JetBrains Mono"
                        fontWeight={700}
                      >
                        {isMerge ? "M" : commit.hash.substring(0, 4)}
                      </text>
                      {/* Commit message tooltip */}
                      <title>{commit.message}</title>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Terminal log */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot bg-git-red" />
              <div className="terminal-dot bg-git-yellow" />
              <div className="terminal-dot bg-git-green" />
              <span className="ml-3 text-xs font-mono text-muted-foreground">live terminal</span>
            </div>
            <div className="terminal-body space-y-1 max-h-[250px] overflow-y-auto">
              <AnimatePresence>
                {log.map((line, i) => (
                  <motion.div
                    key={`${i}-${line}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-xs ${line.startsWith("$") ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {line.startsWith("$") ? (
                      <>
                        <span className="text-git-green">$ </span>
                        <span>{line.substring(2)}</span>
                      </>
                    ) : (
                      <span className="ml-4">{line}</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default InteractivePlayground;
