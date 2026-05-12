/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },

    colors: {
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",

      // Main Theme Colors
      primary: {
        50: "#e8f1f0",
        100: "#c5ddda",
        200: "#9fc8c3",
        300: "#78b2ab",
        400: "#529d94",
        500: "#264653", // charcoal-blue
        600: "#203b46",
        700: "#19303a",
        800: "#13252d",
        900: "#0c1a20",
      },

      secondary: {
        50: "#e7f7f5",
        100: "#c1ebe6",
        200: "#97dfd6",
        300: "#6dd3c5",
        400: "#44c7b5",
        500: "#2a9d8f", // verdigris
        600: "#23877a",
        700: "#1c7065",
        800: "#155950",
        900: "#0e433b",
      },

      accent: {
        50: "#fdf8e8",
        100: "#faefc3",
        200: "#f7e59d",
        300: "#f3dc77",
        400: "#f0d252",
        500: "#e9c46a", // tuscan-sun
        600: "#c9a95b",
        700: "#a98d4c",
        800: "#89723d",
        900: "#69562e",
      },

      highlight: {
        50: "#fef3ea",
        100: "#fde0c2",
        200: "#fbcc99",
        300: "#f9b871",
        400: "#f7a448",
        500: "#f4a261", // sandy-brown
        600: "#d28b53",
        700: "#b07445",
        800: "#8e5d37",
        900: "#6c4629",
      },

      coral: {
        50: "#fdeeea",
        100: "#f9d1c7",
        200: "#f5b4a3",
        300: "#f19780",
        400: "#ed7a5c",
        500: "#e76f51", // burnt-peach
        600: "#c46046",
        700: "#a1503a",
        800: "#7e412f",
        900: "#5b3123",
      },

      // Neutral Greys
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },

    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
    },
  },

  plugins: [],
};