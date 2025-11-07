"use client";

import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export default function ToggleSwitch({ 
  enabled, 
  onChange, 
  label, 
  description,
  disabled = false 
}: ToggleSwitchProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <label className="text-sm font-medium text-white cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-jarvis-soft-gray mt-1">
            {description}
          </p>
        )}
      </div>
      
      <button
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${
          enabled ? 'bg-jarvis-electric-cyan' : 'bg-jarvis-soft-gray/20'
        }`}
        role="switch"
        aria-checked={enabled ? "true" : "false"}
        aria-label={label}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
          animate={{
            x: enabled ? 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </div>
  );
}
