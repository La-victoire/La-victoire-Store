/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-pulse': 'bounce-pulse 3s infinite',
      },
      keyframes: {
        'bounce-pulse': {
          '0%, 100%': { transform: 'translateY(-25%)', opacity: '0.4' },
          '50%': { transform: 'translateY(0)', opacity: '1' },

        },
      },
      colors: {
        gold: "#F4d03f", // Gold color
        "gold-dark": "#B8860B",
      }
    },
  },
  plugins: [],
}

