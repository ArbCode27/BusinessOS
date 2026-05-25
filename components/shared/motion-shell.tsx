"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const MotionPage = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const StaggerGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.075
        }
      }
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </motion.div>
);
