import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#F4A7B9",
          "pink-light": "#FAD4DF",
          "pink-dark": "#E8849A",
          green: "#A8C5A0",
          "green-light": "#C8DFC4",
          "green-dark": "#7DAD74",
          terracotta: "#D4956A",
          "terracotta-light": "#E8B898",
          cream: "#FDF8F3",
          "cream-dark": "#F5EDE0",
          beige: "#EDE0D0",
          brown: "#3D2B1F",
          "brown-light": "#6B4C3B",
          muted: "#8B7355",
          "muted-light": "#B09880",
          lavender: "#C5B8D8",
          yellow: "#F5D080",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(61, 43, 31, 0.06)",
        card: "0 4px 30px rgba(61, 43, 31, 0.08)",
        "card-hover": "0 8px 40px rgba(61, 43, 31, 0.14)",
        pink: "0 4px 20px rgba(244, 167, 185, 0.35)",
        green: "0 4px 20px rgba(168, 197, 160, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "bounce-soft": "bounceSoft 2s infinite",
        "pulse-soft": "pulseSoft 3s infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #FDF8F3 0%, #FAD4DF 50%, #C8DFC4 100%)",
        "gradient-hero":
          "linear-gradient(160deg, #FDF8F3 0%, #F5EDE0 40%, #FAD4DF 100%)",
        "gradient-card":
          "linear-gradient(135deg, #FFFFFF 0%, #FDF8F3 100%)",
        "gradient-pink":
          "linear-gradient(135deg, #FAD4DF 0%, #F4A7B9 100%)",
        "gradient-green":
          "linear-gradient(135deg, #C8DFC4 0%, #A8C5A0 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
