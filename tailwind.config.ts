import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          navy: {
            DEFAULT: '#09121D', // The deep background
            light: '#112235',   // Card background
          },
          cyan: {
            DEFAULT: '#00E0FF', // The glowing text
            dim: 'rgba(0, 224, 255, 0.1)',
          },
          amber: {
            DEFAULT: '#FFB020', // The progress bar
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#586A84', // That specific grey for "Alex"
            tertiary: '#3B4C63',
          },
          // Legacy support & additional colors
          gray: '#586A84',
          green: '#10B981', // Emerald 500
          'soft-gray': '#94A3B8', // Slate 400 - softer than the main gray
          'deep-navy': '#09121D', // Alias for main navy
          'electric-cyan': '#00E0FF', // Alias for main cyan
          'warm-amber': '#FFB020', // Alias for main amber
          'muted-green': '#059669', // Emerald 600
        },
      },
      fontFamily: {
        // You must import 'Space Grotesk' from Google Fonts in layout.tsx
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // This is the secret sauce: A subtle radial light from the top
        'jarvis-gradient': 'radial-gradient(circle at 50% 0%, #162a45 0%, #09121D 60%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 224, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
