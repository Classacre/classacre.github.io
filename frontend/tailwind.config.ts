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
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config