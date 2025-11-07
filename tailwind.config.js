/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#4F46E5", // Indigo main theme
        secondary: "#6366F1",
        accent: "#A78BFA",
        dark: "#0F172A",
        light: "#F8FAFC",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.6)",
        smooth: "0 4px 12px rgba(0,0,0,0.1)",
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
        bounceSlow: "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
