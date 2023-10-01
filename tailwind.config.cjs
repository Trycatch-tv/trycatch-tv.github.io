/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "tc-black": "#232122",
        "tc-black-l": "#474646",
        "tc-cyan": "#A2F2F2",
        "tc-yellow": "#EDF2C2",
        "tc-gray": "#B5B5B5",
        "tc-gray-l": "#F2F2F2",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
};
