/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#f7f5f2",
        lemon: "#fff44f",
        ember: "#ff5a1f",
        emberDeep: "#e03e00",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        pressure: ["Roboto Flex", "sans-serif"],
      },
      keyframes: {
        contactIn: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        contactIn: "contactIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
