import { motion } from "framer-motion";
import { forwardRef } from "react";

interface BranchLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay?: number;
  curved?: boolean;
}

const BranchLine = forwardRef<SVGPathElement, BranchLineProps>(
  ({ x1, y1, x2, y2, color, delay = 0, curved = false }, _ref) => {
    const path = curved
      ? `M ${x1} ${y1} C ${x1 + (x2 - x1) / 2} ${y1}, ${x1 + (x2 - x1) / 2} ${y2}, ${x2} ${y2}`
      : `M ${x1} ${y1} L ${x2} ${y2}`;

    return (
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    );
  }
);

BranchLine.displayName = "BranchLine";

export default BranchLine;
