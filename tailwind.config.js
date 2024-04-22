/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // figma, warna biru dari kanan ke kiri
        blueA: '#00619a',
        blueB: '#0077c2',
        blueC: '#59a5f5',
        blueD: '#00bfff',
        blueE: '#c8ffff',
        blueF: '#4da9ff',
        // figma, warna hitam dari kanan ke kiri
        neutralA: '#333333',
        neutralB: '#5c5c5c',
        neutralC: '#cccccc',
        neutralD: '#f5f5f5',
        neutralE: '#ffffff',
        neutralF: '#e3e3e3',

      },
    },
  },
  plugins: [],
};
