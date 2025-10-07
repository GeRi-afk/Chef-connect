{import('tailwindcss').Config} 
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [],
};