/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        faded_white: "#D9D9D9",
        faded_gray: "#CDCDCD",
        faded_black: "#1D1D1D",
        faded_blue: "#2C7BE5",
        faded_green: "#2ECC71",
        dark_blue1: "#011324",
        dark_blue2: "#1A2A39",
        light_blue1: "#0240a3",
        light_blue2: "#2C7BE5",
        light_blue3: "#1b53ac",
        light_blue4: "#E1F7F5",
        light_blue5: "#9AC8CD",
        // Replace with your desired dark blue color code
      },
      fontFamily: {
        'trap': [
          'Trap-Light',
          'Trap-Regular',
          'Trap-Medium',
          'Trap-Semibold',
          'Trap-Bold',
          'Trap-ExtraBold',
          'Trap-Black',
          'DTGetaiGroteskDisplay-Black',
          'sans-serif',
        ],
      },
      textColor: {
        'hover': 'var(--color-4)',
        'hover-dark': 'var(--color-2)',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },

    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
  ],
  daisyui: {
    styled: true,
    themes: false,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}
