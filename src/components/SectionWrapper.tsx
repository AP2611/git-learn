import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className = "" }: SectionWrapperProps) => (
  <section
    id={id}
    className={`min-h-screen flex flex-col items-center justify-center px-6 py-24 relative ${className}`}
  >
    <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div className="relative z-10 w-full max-w-5xl mx-auto">
      {children}
    </div>
  </section>
);

export default SectionWrapper;
