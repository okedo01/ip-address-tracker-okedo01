/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(0, 0%, 17%)',
        secondary: 'hsl(0, 0%, 59%)',
        tertiary: 'hsl(228, 45%, 44%)'
      },

      backgroundImage: {
        desktopPattern: "url('/images/pattern-bg-desktop.png')",
        mobikePattern: "url('/images/pattern-bg-mobile.png')"
      },

      fontFamily: {
        body: ["Rubik", "sans-serif"]
      },

      fontSize: {
        input: '18px',
        footerText: '12px'
      },

      width: {
        wInput: '28rem',
        fullWidth: '100%'
      },

      height: {
        heightMap: '400px'
      }
    },
  },
  plugins: [],
}

