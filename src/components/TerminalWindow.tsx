import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TerminalWindowProps {
  commands: { prompt?: string; command: string; output?: string }[];
  title?: string;
  delay?: number;
}

const TerminalWindow = ({ commands, title = "terminal", delay = 0 }: TerminalWindowProps) => (
  <motion.div
    className="terminal-window w-full max-w-xl"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="terminal-header">
      <div className="terminal-dot bg-git-red" />
      <div className="terminal-dot bg-git-yellow" />
      <div className="terminal-dot bg-git-green" />
      <span className="ml-3 text-xs font-mono text-muted-foreground">{title}</span>
    </div>
    <div className="terminal-body space-y-2">
      {commands.map((cmd, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + i * 0.3, duration: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-2">
            <span className="text-git-green">$</span>
            <span className="text-foreground">{cmd.command}</span>
          </div>
          {cmd.output && (
            <div className="text-muted-foreground ml-4 mt-1">{cmd.output}</div>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default TerminalWindow;
