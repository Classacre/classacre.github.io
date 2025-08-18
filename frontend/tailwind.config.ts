import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // app, pages, components
    './public/**/*.svg',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0B0F14',
        surface: '#0F172A',
        textPrimary: '#E5E7EB',
        textSecondary: '#9CA3AF',
        primary: '#5B5BD6',
        accent: '#00C2C7',
        accent2: '#E254FF',
        childhood: '#60A5FA',
        personality: '#34D399',
        career: '#F59E0B',
        relationships: '#F472B6',
        health: '#84CC16',
        habits: '#A78BFA',
        location: '#22D3EE',
        misc: '#94A3B8',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'serif'],
      },
      backgroundImage: {
        'visualizer-gradient':
          'radial-gradient(circle at center, rgba(91,91,214,1) 0%, rgba(0,194,199,1) 50%, rgba(226,84,255,1) 100%)',
        'brand-ring': 'conic-gradient(from 0deg, #5B5BD6, #00C2C7, #E254FF)',
      },
      boxShadow: {
        'disco-glow': '0 6px 30px rgba(91,91,214,0.25), 0 2px 8px rgba(0,194,199,0.12)',
      },
      transitionProperty: {
        'tile-color': 'background-color, color, transform, box-shadow',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'bg-childhood',
    'bg-personality',
    'bg-career',
    'bg-relationships',
    'bg-health',
    'bg-habits',
    'bg-location',
    'bg-misc',
  ],
};

export default config;