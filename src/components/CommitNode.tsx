import { motion } from "framer-motion";
import { forwardRef } from "react";

interface CommitNodeProps {
  color: string;
  label: string;
  delay?: number;
  size?: number;
  x?: number;
  y?: number;
  glow?: boolean;
}

const CommitNode = forwardRef<SVGGElement, CommitNodeProps>(
  ({ color, label, delay = 0, size = 40, x = 0, y = 0, glow = false }, _ref) => (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
      viewport={{ once: true }}
    >
      {glow && (
        <circle cx={x} cy={y} r={size / 2 + 8} fill={color} opacity={0.15}>
          <animate attributeName="r" values={`${size / 2 + 5};${size / 2 + 12};${size / 2 + 5}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      <circle
        cx={x}
        cy={y}
        r={size / 2}
        fill="hsl(var(--card))"
        stroke={color}
        strokeWidth={3}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize={11}
        fontFamily="JetBrains Mono"
        fontWeight={600}
      >
        {label}
      </text>
    </motion.g>
  )
);

CommitNode.displayName = "CommitNode";

export default CommitNode;
