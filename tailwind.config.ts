import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        royal: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // Primary Royal Blue (#2563EB)
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#0f172a"
        },
        obsidian: {
          950: "#05070B",
          900: "#0B0E17",
          850: "#101422",
          800: "#161B2E",
          750: "#1D233A",
          700: "#252C48",
          600: "#374163"
        }
      },
      borderRadius: {
        '20': '20px',
        '22': '22px',
        '24': '24px',
        '28': '28px',
        '32': '32px'
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-outfit)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Menlo", "monospace"]
      },
      boxShadow: {
        'royal-sm': '0 0 15px -3px rgba(37, 99, 235, 0.25)',
        'royal': '0 0 25px -4px rgba(37, 99, 235, 0.35)',
        'royal-lg': '0 0 40px -5px rgba(37, 99, 235, 0.45)',
        'glass-subtle': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-glow': 'borderGlow 4s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(37, 99, 235, 0.3)' },
          '50%': { borderColor: 'rgba(96, 165, 250, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
