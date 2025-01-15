/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['"Montserrat"', 'sans-serif'],
        MontserratBold: ['"Montserrat-Bold"', 'sans-serif'],
        MontserratExtraBold: ['"Montserrat-ExtraBold"', 'sans-serif'],
        MontserratExtraLight: ['"Montserrat-ExtraLight"', 'sans-serif'],
        MontserratLight: ['"Montserrat-Light"', 'sans-serif'],
        MontserratMedium: ['"Montserrat-Medium"', 'sans-serif'],
        MontserratRegular: ['"Montserrat-Regular"', 'sans-serif'],
        MontserratSemiBold: ['"Montserrat-SemiBold"', 'sans-serif'],
        MontserratThin: ['"Montserrat-Thin"', 'sans-serif'],
        MontserratItalic: ['"Montserrat-Italic"', 'sans-serif'],
        MontserratBoldItalic: ['"Montserrat-BoldItalic"', 'sans-serif'],
        MontserratExtraBoldItalic: ['"Montserrat-ExtraBoldItalic"', 'sans-serif'],
        MontserratExtraLightItalic: ['"Montserrat-ExtraLightItalic"', 'sans-serif'],
        MontserratLightItalic: ['"Montserrat-LightItalic"', 'sans-serif'],
        MontserratMediumItalic: ['"Montserrat-MediumItalic"', 'sans-serif'],
        MontserratRegularItalic: ['"Montserrat-RegularItalic"', 'sans-serif'],
        MontserratSemiBoldItalic: ['"Montserrat-SemiBoldItalic"', 'sans-serif'],
        MontserratThinItalic: ['"Montserrat-ThinItalic"', 'sans-serif'],
      },
      colors: {
        primary: '#0066e1',
        secondary: '#11ace2',
        background: '#ed7d31',
      },
    },
  },
  plugins: [],
};


