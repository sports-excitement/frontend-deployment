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
        // Brand Colors
        primary: '#FF4500',
        secondary: '#167968',
        'gray-dark': '#55575B',
        'gray-darker': '#282D33',
        
        // Gray Scale
        gray: {
          90: '#55575B',
          70: '#646A75',
          50: '#B0B6C0',
          30: '#D4DAE4',
          10: '#F3F8FF',
        },
        
        // Color Ramps for Primary (Orange)
        'primary-90': '#CC3700',
        'primary-70': '#FF5719',
        'primary-50': '#FF4500', // Primary
        'primary-30': '#FF6833',
        'primary-10': '#FF8B66',
        'primary-5': '#FFA999',
        
        // Color Ramps for Secondary (Green)
        'secondary-90': '#116154',
        'secondary-70': '#167968', // Secondary
        'secondary-50': '#1B917C',
        'secondary-30': '#20A990',
        'secondary-10': '#25C1A4',
        'secondary-5': '#2AD9B8',

        // Semantic colors
        'off-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        // Headers
        'h1': ['40px', { lineHeight: '56px' }],
        'h1-sm': ['32px', { lineHeight: '48px' }],
        'h3': ['26px', { lineHeight: '40px' }],
        'h4': ['24px', { lineHeight: '32px' }],
        // Body
        'body-1': ['18px', { lineHeight: '20px' }],
        'body-2': ['14px', { lineHeight: '20px' }],
        'small': ['12px', { lineHeight: '20px' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0.05em' }],
      },
    },
  },
  plugins: [],
}

export default config
