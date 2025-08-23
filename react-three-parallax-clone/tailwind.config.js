/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui', 'Inter', 'Segoe UI', 'Roboto'],
      },
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d6edff",
          200: "#a8d7ff",
          300: "#75beff",
          400: "#3fa2ff",
          500: "#1f8bff",
          600: "#0e74e6",
          700: "#075bb7",
          800: "#074a93",
          900: "#0a3e79"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.25)",
      }
    },
  },
  plugins: [],
}
