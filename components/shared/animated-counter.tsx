"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
};

export const AnimatedCounter = ({ value, prefix = "", suffix = "", compact = false }: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const formatted = new Intl.NumberFormat("en-US", {
      notation: compact ? "compact" : "standard",
      maximumFractionDigits: suffix ? 1 : 0
    }).format(latest);

    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });

    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};
