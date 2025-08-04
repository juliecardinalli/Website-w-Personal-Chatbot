/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // only if you have one
    "./src/**/*.{js,ts,jsx,tsx}", // Tailwind will scan *all* components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
