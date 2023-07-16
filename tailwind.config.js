/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#615EFF',
        hoveraccent: '#4F4FFF',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }
    },
    screens: {
      'sm': '600px',
      // Default: 640px
      // Reason for customisation: put in line with the Material UI breakpoints

      'md': '900px',
      // Default: 768px

      'lg': '1200px',
      // Default: 1024px

      'xl': '1536px',
      // Default: 1280px

      '2xl': '1536px',
      // Default: 1536px
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".cut-corners": {
          // clipPath: "polygon(25% 0, 100% 0, 75% 100%, 0% 100%)",
          clipPath: "polygon(0 0, 83% 0, 100% 100%, 9% 100%, 0 62%)",
        },
        ".cut-corners-mobile": {
          // clipPath: "polygon(25% 0, 100% 0, 75% 100%, 0% 100%)",
          clipPath: "polygon(77% 0, 100% 0, 100% 100%, 45% 100%);",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
