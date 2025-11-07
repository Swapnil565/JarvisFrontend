'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hoverSpring, tapSpring, motionTransition } from '../../lib/motion';

type MotionButtonProps = React.ComponentProps<typeof motion.button>;

interface ButtonProps extends Omit<MotionButtonProps, 'className'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  haptics?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  haptics = true,
  ...props
}) => {
  const baseClasses = 'btn';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  const variants = {
    rest: { scale: 1 },
    hover: { scale: 1.03, y: -2 },
    tap: { scale: 0.97, y: 0 },
    focus: { scale: 1.02, boxShadow: '0 0 0 4px rgba(0,217,255,0.08)' }
  };

  const handleTap = (e: React.PointerEvent) => {
    // optional haptic feedback on supported devices
    try {
      if (haptics && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        // vibrate for 10ms for subtle feedback
        (navigator as any).vibrate(10);
      }
    } catch (err) {
      // ignore
    }
    // forward any onTap provided
    if ((props as any).onTap) (props as any).onTap(e);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    // ripple for non-vibrating devices
    try {
      const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 0.6;
      ripple.className = 'ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      (e.currentTarget as HTMLButtonElement).appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 650);
    } catch (err) {
      // ignore
    }
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      whileFocus="focus"
      variants={variants}
  transition={{ ...motionTransition, hover: hoverSpring, tap: tapSpring }}
      onPointerUp={handleTap}
      onPointerDown={handlePointerDown}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} focus:outline-none focus-visible:ring-0 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
