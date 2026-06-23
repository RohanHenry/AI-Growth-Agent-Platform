import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14151f",
        muted: "#667085",
        line: "#e6e8ef",
        cloud: "#f6f7fb",
        brand: "#2854c5",
        coral: "#e65f4f",
        mint: "#19a974",
        amber: "#d69e2e"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(20, 21, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
