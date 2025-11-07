"use client";

import { motion } from 'framer-motion';

interface DangerButtonProps {
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function DangerButton({ onClick, label, icon, disabled = false }: DangerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`w-full px-4 py-3 rounded-lg border-2 border-red-500/30 bg-red-500/10 
        text-red-400 font-medium text-sm flex items-center justify-center gap-2 
        transition-all ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-red-500/20 hover:border-red-500/50'
        }`}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </motion.button>
  );
}
