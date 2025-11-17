"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { navItemVariants } from '@/lib/animations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { copy } from '@/lib/copy';

const items = [
  { href: '/dashboard', label: copy.navigation.home, emoji: '🏠' },
  { href: '/log', label: copy.navigation.log, emoji: '🎙️' },
  { href: '/insights', label: copy.navigation.insights, emoji: '📊' },
  { href: '/settings', label: copy.navigation.you, emoji: '⚙️' }
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-jarvis-deep-navy/80 backdrop-blur rounded-3xl px-4 py-2 flex items-center gap-4 shadow-lg">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <motion.div key={it.href} variants={navItemVariants} initial="rest" whileHover="hover" whileTap="tap">
              <Link
                href={it.href}
                className={`flex flex-col items-center text-center px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1 ${active ? 'text-jarvis-cyan' : 'text-jarvis-soft-gray'}`}
              >
                <span className="text-xl">{it.emoji}</span>
                <span className="text-xs mt-1">{it.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
};
