/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ Important for React
  ],
  theme: {
    extend: {
        fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
}
