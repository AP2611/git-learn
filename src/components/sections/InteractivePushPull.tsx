import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

interface CommitItem {
  id: string;
  message: string;
  hash: string;
}

const generateHash = () => Math.random().toString(36).substring(2, 9);

const initialLocal: CommitItem[] = [
  { id: "1", message: "Initial commit", hash: generateHash() },
  { id: "2", message: "Add homepage", hash: generateHash() },
];

const InteractivePushPull = () => {
  const [localCommits, setLocalCommits] = useState<CommitItem[]>([...initialLocal]);
  const [remoteCommits, setRemoteCommits] = useState<CommitItem[]>([initialLocal[0]]);
  const [log, setLog] = useState<string[]>(["$ git remote add origin https://github.com/you/repo.git"]);
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [transferringCommits, setTransferringCommits] = useState<CommitItem[]>([]);
  const [transferDirection, setTransferDirection] = useState<"push" | "pull" | null>(null);
  const [commitMsg, setCommitMsg] = useState("");
  const [teammateMsg, setTeammateMsg] = useState("");

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [...prev.slice(-12), msg]);
  }, []);

  const handleLocalCommit = () => {
    const msg = commitMsg || "Update files";
    const hash = generateHash();
    const newCommit: CommitItem = { id: String(Date.now()), message: msg, hash };
    setLocalCommits((prev) => [...prev, newCommit]);
    addLog(`$ git commit -m "${msg}"`);
    addLog(`[main ${hash.substring(0, 7)}] ${msg}`);
    setCommitMsg("");
  };

  const handleTeammateCommit = () => {
    const msg = teammateMsg || "Teammate's update";
    const hash = generateHash();
    const newCommit: CommitItem = { id: String(Date.now()), message: msg, hash };
    setRemoteCommits((prev) => [...prev, newCommit]);
    addLog(`[teammate pushed] ${msg} (${hash.substring(0, 7)})`);
    setTeammateMsg("");
  };

  const handlePush = async () => {
    const unpushed = localCommits.filter(
      (lc) => !remoteCommits.find((rc) => rc.id === lc.id)
    );
    if (unpushed.length === 0) {
      addLog("$ git push origin main");
      addLog("Everything up-to-date");
      return;
    }

    // Check if remote has commits we don't have
    const unpulled = remoteCommits.filter(
      (rc) => !localCommits.find((lc) => lc.id === rc.id)
    );
    if (unpulled.length > 0) {
      addLog("$ git push origin main");
      addLog("! [rejected] main -> main (non-fast-forward)");
      addLog("hint: pull first, then push again");
      return;
    }

    setIsPushing(true);
    setTransferringCommits(unpushed);
    setTransferDirection("push");
    addLog("$ git push origin main");
    addLog(`Enumerating objects: ${unpushed.length * 3}, done.`);
    addLog("Compressing objects: 100%, done.");

    await new Promise((r) => setTimeout(r, 1500));

    setRemoteCommits((prev) => [...prev, ...unpushed]);
    setTransferringCommits([]);
    setTransferDirection(null);
    setIsPushing(false);
    addLog(`To https://github.com/you/repo.git`);
    addLog(`  main -> main (${unpushed.length} commit${unpushed.length > 1 ? "s" : ""})`);
  };

  const handlePull = async () => {
    const unpulled = remoteCommits.filter(
      (rc) => !localCommits.find((lc) => lc.id === rc.id)
    );
    if (unpulled.length === 0) {
      addLog("$ git pull origin main");
      addLog("Already up to date.");
      return;
    }

    setIsPulling(true);
    setTransferringCommits(unpulled);
    setTransferDirection("pull");
    addLog("$ git pull origin main");
    addLog(`remote: Counting objects: ${unpulled.length * 3}, done.`);

    await new Promise((r) => setTimeout(r, 1500));

    setLocalCommits((prev) => [...prev, ...unpulled]);
    setTransferringCommits([]);
    setTransferDirection(null);
    setIsPulling(false);
    addLog(`Fast-forward`);
    addLog(`${unpulled.length} file${unpulled.length > 1 ? "s" : ""} changed`);
  };

  const handleReset = () => {
    setLocalCommits([...initialLocal]);
    setRemoteCommits([initialLocal[0]]);
    setLog(["$ git remote add origin https://github.com/you/repo.git"]);
    setTransferringCommits([]);
    setTransferDirection(null);
    setCommitMsg("");
    setTeammateMsg("");
  };

  return (
    <SectionWrapper id="push-pull-sim">
      <motion.span
        className="text-accent font-mono text-sm mb-4 block text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🔄 Push & Pull Simulator
      </motion.span>
      <motion.h2
        className="section-heading text-foreground mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-accent">Push</span> & <span className="text-git-orange">Pull</span> Live
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Make commits locally, simulate a teammate pushing to remote, then push and pull to see commits transfer in real-time.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6 mb-6 relative">
        {/* Transfer animation overlay */}
        <AnimatePresence>
          {transferringCommits.length > 0 && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {transferringCommits.map((commit, i) => (
                <motion.div
                  key={commit.id}
                  className="absolute px-3 py-1.5 rounded-lg font-mono text-xs font-bold border-2 bg-card"
                  style={{
                    borderColor: transferDirection === "push" ? `hsl(var(--git-cyan))` : `hsl(var(--git-orange))`,
                    color: transferDirection === "push" ? `hsl(var(--git-cyan))` : `hsl(var(--git-orange))`,
                  }}
                  initial={{
                    x: transferDirection === "push" ? "-30%" : "30%",
                    opacity: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    x: transferDirection === "push" ? "30%" : "-30%",
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {commit.hash.substring(0, 7)}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Local */}
        <div className="rounded-xl border border-border bg-card p-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💻</span>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">Local Repository</h3>
              <p className="text-xs text-muted-foreground">Your machine</p>
            </div>
          </div>
          <div className="space-y-1.5 mb-4 max-h-[200px] overflow-y-auto">
            <AnimatePresence>
              {localCommits.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-xs px-3 py-2 rounded bg-muted text-muted-foreground flex items-center gap-2"
                >
                  <span className="text-primary font-bold">{c.hash.substring(0, 7)}</span>
                  <span className="truncate">{c.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={commitMsg}
              onChange={(e) => setCommitMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLocalCommit()}
              placeholder="Your commit message..."
              className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground font-mono text-xs border border-border focus:outline-none focus:border-primary/50"
            />
            <button
              onClick={handleLocalCommit}
              className="px-3 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Commit
            </button>
          </div>
        </div>

        {/* Remote */}
        <div className="rounded-xl border border-border bg-card p-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">☁️</span>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">Remote (GitHub)</h3>
              <p className="text-xs text-muted-foreground">Cloud-hosted</p>
            </div>
          </div>
          <div className="space-y-1.5 mb-4 max-h-[200px] overflow-y-auto">
            <AnimatePresence>
              {remoteCommits.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-xs px-3 py-2 rounded bg-muted text-muted-foreground flex items-center gap-2"
                >
                  <span className="text-accent font-bold">{c.hash.substring(0, 7)}</span>
                  <span className="truncate">{c.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={teammateMsg}
              onChange={(e) => setTeammateMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTeammateCommit()}
              placeholder="Teammate's commit..."
              className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground font-mono text-xs border border-border focus:outline-none focus:border-accent/50"
            />
            <button
              onClick={handleTeammateCommit}
              className="px-3 py-2 rounded-lg font-mono text-xs font-bold transition-colors"
              style={{ background: `hsl(var(--git-orange) / 0.15)`, color: `hsl(var(--git-orange))` }}
            >
              Push as Teammate
            </button>
          </div>
        </div>
      </div>

      {/* Push/Pull buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handlePush}
          disabled={isPushing || isPulling}
          className="px-6 py-3 rounded-xl font-mono text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2 border-2"
          style={{
            borderColor: `hsl(var(--git-cyan))`,
            color: `hsl(var(--git-cyan))`,
            background: `hsl(var(--git-cyan) / 0.1)`,
          }}
        >
          <motion.span animate={isPushing ? { y: [0, -4, 0] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
            ⬆
          </motion.span>
          git push
        </button>
        <button
          onClick={handlePull}
          disabled={isPushing || isPulling}
          className="px-6 py-3 rounded-xl font-mono text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2 border-2"
          style={{
            borderColor: `hsl(var(--git-orange))`,
            color: `hsl(var(--git-orange))`,
            background: `hsl(var(--git-orange) / 0.1)`,
          }}
        >
          <motion.span animate={isPulling ? { y: [0, 4, 0] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
            ⬇
          </motion.span>
          git pull
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-3 rounded-xl font-mono text-xs text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Terminal log */}
      <div className="max-w-2xl mx-auto">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot bg-git-red" />
            <div className="terminal-dot bg-git-yellow" />
            <div className="terminal-dot bg-git-green" />
            <span className="ml-3 text-xs font-mono text-muted-foreground">push/pull terminal</span>
          </div>
          <div className="terminal-body space-y-1 max-h-[200px] overflow-y-auto">
            <AnimatePresence>
              {log.map((line, i) => (
                <motion.div
                  key={`${i}-${line}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs ${line.startsWith("$") ? "text-foreground" : line.startsWith("!") ? "text-git-red" : line.startsWith("[teammate") ? "text-git-orange" : "text-muted-foreground"}`}
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
    </SectionWrapper>
  );
};

export default InteractivePushPull;
