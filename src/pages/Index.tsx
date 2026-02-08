import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import HeroSection from "@/components/sections/HeroSection";
import GitInitSection from "@/components/sections/GitInitSection";
import StagingCommitSection from "@/components/sections/StagingCommitSection";
import BranchingSection from "@/components/sections/BranchingSection";
import MergingSection from "@/components/sections/MergingSection";
import RemoteSection from "@/components/sections/RemoteSection";
import GitHubFlowSection from "@/components/sections/GitHubFlowSection";
import InteractivePlayground from "@/components/sections/InteractivePlayground";
import InteractivePushPull from "@/components/sections/InteractivePushPull";
import InteractivePRFlow from "@/components/sections/InteractivePRFlow";

const Index = () => {
  return (
    <div className="bg-background text-foreground relative">
      <FloatingParticles />
      <Navbar />
      <HeroSection />

      {/* Divider */}
      <div className="flex items-center justify-center py-4">
        <motion.div
          className="h-px flex-1 max-w-xs"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
        <span className="px-4 font-mono text-xs text-muted-foreground">LEARN THE BASICS</span>
        <motion.div
          className="h-px flex-1 max-w-xs"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
      </div>

      <GitInitSection />
      <StagingCommitSection />
      <BranchingSection />
      <MergingSection />
      <RemoteSection />
      <GitHubFlowSection />

      {/* Interactive section divider */}
      <div className="flex items-center justify-center py-8">
        <motion.div
          className="h-px flex-1 max-w-xs"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--accent) / 0.5), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
        <motion.span
          className="px-6 py-2 font-mono text-sm text-accent border border-accent/30 rounded-full"
          animate={{ boxShadow: ["0 0 10px hsl(var(--accent) / 0.1)", "0 0 25px hsl(var(--accent) / 0.3)", "0 0 10px hsl(var(--accent) / 0.1)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎮 INTERACTIVE SIMULATORS
        </motion.span>
        <motion.div
          className="h-px flex-1 max-w-xs"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--accent) / 0.5), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
      </div>

      <InteractivePlayground />
      <InteractivePushPull />
      <InteractivePRFlow />

      {/* Footer */}
      <footer className="border-t border-border py-16 text-center relative">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
          style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.5), transparent)" }}
        />
        <motion.p
          className="font-mono text-sm text-muted-foreground mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built with ❤️ to make Git less scary
        </motion.p>
        <motion.p
          className="font-mono text-xs text-muted-foreground/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Every expert was once a beginner → <span className="text-primary">git commit -m "keep learning"</span>
        </motion.p>
      </footer>
    </div>
  );
};

export default Index;
