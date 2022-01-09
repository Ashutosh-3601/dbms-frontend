module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        swipefromtop: 'swipefromtop 0.4s ease-in-out',
      },

      // that is actual animation
      /*
      from {top:-300px; opacity:0}
  to {top:0; opacity:1}*/
      keyframes: theme => ({
        swipefromtop: {
          '0%': { top: '-300px', opacity: '0' },
          '100%': { top: '0', opacity: '1' },
        },
      }),
    },
  },
  plugins: [],
}