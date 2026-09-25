/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0A0C0E',
          deep: '#060708',
          light: '#13171D',
          card: '#161B22',
          border: '#242C35',
        },
        mud: {
          DEFAULT: '#382212',
          deep: '#1E1107',
          dark: '#27170B',
          light: '#573A25',
          clay: '#6F4B30',
          wet: '#4A2F1B',
        },
        amber: {
          DEFAULT: '#FF7A00',
          bright: '#FFA043',
          dark: '#C95E00',
          subtle: 'rgba(255, 122, 0, 0.15)',
        },
        cyan: {
          DEFAULT: '#00E5FF',
          bright: '#6EFAFF',
          dark: '#00A8BC',
          subtle: 'rgba(0, 229, 255, 0.15)',
        },
        timber: {
          DEFAULT: '#D4A373',
          light: '#EAD1B8',
          dark: '#9F6F3E',
          raw: '#7A4F26',
        },
        steel: {
          DEFAULT: '#A2ACB6',
          light: '#E2E8F0',
          dark: '#4B5563',
          plate: '#2C343D',
          border: '#3A4450',
        },
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.35)',
        'glow-amber': '0 0 25px rgba(255, 122, 0, 0.4)',
        'glow-mud': '0 0 30px rgba(56, 34, 18, 0.6)',
        'industrial': 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 30px -10px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'steel-gradient': 'linear-gradient(135deg, rgba(162, 172, 182, 0.12) 0%, rgba(44, 52, 61, 0.4) 100%)',
        'mud-gradient': 'linear-gradient(180deg, rgba(87, 58, 37, 0.25) 0%, rgba(10, 12, 14, 0.95) 100%)',
        'circuit-grid': 'radial-gradient(rgba(0, 229, 255, 0.15) 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(rgba(212, 163, 115, 0.12) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-very-slow': 'spin 40s linear infinite',
        'spin-reverse': 'spin-reverse 30s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'float-gentle': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
