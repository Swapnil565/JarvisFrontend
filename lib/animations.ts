// Shared animation presets for consistent motion across the app.
// Keep variants minimal and composable.

import { Transition } from 'framer-motion';

// Base spring configs
export const springFast: Transition = { type: 'spring', stiffness: 300, damping: 30 }; // snappy
export const springMedium: Transition = { type: 'spring', stiffness: 240, damping: 28 }; // default
export const springSoft: Transition = { type: 'spring', stiffness: 200, damping: 25 }; // gentle

// Fade variants
export const fadeIn = {
	hidden: { opacity: 0 },
	visible: (delay: number = 0) => ({ opacity: 1, transition: { ...springSoft, delay } })
};

// Scale + fade (pop)
export const popIn = {
	hidden: { opacity: 0, scale: 0.94, y: 12 },
	visible: (delay: number = 0) => ({ opacity: 1, scale: 1, y: 0, transition: { ...springMedium, delay } }),
	exit: { opacity: 0, scale: 0.94, y: 12, transition: springSoft }
};

// Slide up (overlays, modals)
export const slideUp = {
	hidden: { opacity: 0, y: 32 },
	visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { ...springMedium, delay } }),
	exit: { opacity: 0, y: 32, transition: springSoft }
};

// Bottom nav item hover/tap variants
export const navItemVariants = {
	rest: { scale: 1, y: 0 },
	hover: { scale: 1.15, y: -4, transition: springFast },
	tap: { scale: 0.95, y: 0, transition: springFast }
};

// VoiceLog record button variants
export const recordButtonVariants = {
	idle: { scale: 1 },
	recording: { scale: 1.05, transition: { type: 'spring', stiffness: 260, damping: 18, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.4 } }
};

// Stagger helper
export const staggerChildren = (stagger: number = 0.06) => ({
	animate: { transition: { staggerChildren: stagger } }
});

// Child fade for stagger contexts
export const childFade = {
	hidden: { opacity: 0, y: 8 },
	visible: { opacity: 1, y: 0, transition: springSoft }
};

// Utility to combine delays
export const withDelay = (delay: number, variant: any) => {
	if (typeof variant.visible === 'function') return variant.visible(delay);
	return { ...variant.visible, transition: { ...(variant.visible?.transition || {}), delay } };
};
