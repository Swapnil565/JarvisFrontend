"use client";

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'bar';
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({ 
  variant = 'card', 
  count = 1,
  className = ''
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const baseClass = "bg-jarvis-soft-gray/10 animate-pulse";

  const variantClasses = {
    card: "glass-card h-48 w-full",
    text: "h-4 w-full rounded",
    circle: "w-12 h-12 rounded-full",
    bar: "h-2 w-full rounded-full",
  };

  return (
    <>
      {skeletons.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`${baseClass} ${variantClasses[variant]} ${className}`}
        />
      ))}
    </>
  );
}
