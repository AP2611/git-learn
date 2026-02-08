import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Init", href: "#git-init" },
  { label: "Add & Commit", href: "#staging" },
  { label: "Branch", href: "#branching" },
  { label: "Merge", href: "#merging" },
  { label: "Push & Pull", href: "#remote" },
  { label: "GitHub Flow", href: "#github-flow" },
  { label: "🎮 Sandbox", href: "#playground" },
  { label: "🔄 Push/Pull Sim", href: "#push-pull-sim" },
  { label: "🔀 PR Sim", href: "#pr-simulator" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-mono font-bold text-primary text-lg glow-text">
          git<span className="text-accent">Learn</span>
        </a>
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-mono"
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          className="lg:hidden text-muted-foreground hover:text-foreground font-mono text-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"} Menu
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 space-y-1"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-mono"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
