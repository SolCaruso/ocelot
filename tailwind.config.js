/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/lib/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui'],
        },
        screens: {
          "xs": "400px",
          "2xs": "375px",
          "3xs": "390px",
          "4xs": "350px",
          "3.5xs":"420px",
          "4xs": "430px",
          "4sm": "490px",
          "3sm": "465px",
          "2sm": "620px",
          "2md": "820px",
          '3md': '992px',
          '4md': '1078px',
          '5md':"1650px",
          "3xl": "2000px",
          "4xl": "2700px",
          "5xl": "3500px",
        },
      },
    },
    plugins: [

    ],
  }