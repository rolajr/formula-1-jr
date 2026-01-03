import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors - Dark Theme
        dark: {
          950: '#0A0A0B',
          900: '#131316',
          800: '#1C1C21',
          700: '#27272E',
        },
        // Text Colors
        light: {
          50: '#FAFAFA',
          100: '#E5E5E7',
          400: '#9CA3AF',
          600: '#6B7280',
        },
        // Accent Colors (F1 Racing)
        accent: {
          red: {
            500: '#E10600',
            600: '#C00500',
          },
          neon: '#FF1E00',
          cyan: '#00E0FF',
          gold: '#FFD700',
        },
        // Team Colors
        team: {
          ferrari: '#DC0000',
          mercedes: '#00D2BE',
          redbull: '#0600EF',
          mclaren: '#FF8700',
          alpine: '#0090FF',
          aston: '#006F62',
          williams: '#005AFF',
          alfa: '#900000',
          haas: '#787878',
          alphatauri: '#2B4562',
        },
        // Semantic Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Rajdhani', 'Inter', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(255, 30, 0, 0.4), 0 0 40px rgba(255, 30, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
