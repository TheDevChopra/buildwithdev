import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#C7C7C7',
        input: '#C7C7C7',
        ring: '#1351AA',
        background: '#E3E2DE',
        foreground: '#141414',
        primary: {
          DEFAULT: '#1351AA',
          foreground: '#E3E2DE'
        },
        secondary: {
          DEFAULT: '#444343',
          foreground: '#E3E2DE'
        },
        muted: {
          DEFAULT: '#7A7A7A',
          foreground: '#E3E2DE'
        },
        accent: {
          DEFAULT: '#1351AA',
          foreground: '#E3E2DE'
        },
        popover: {
          DEFAULT: '#E3E2DE',
          foreground: '#141414'
        },
        card: {
          DEFAULT: '#E3E2DE',
          foreground: '#141414'
        },
        cream: '#E3E2DE',
        blue: '#1351AA',
        jet: '#141414',
        deepgray: '#444343',
        mutedlabel: '#7A7A7A',
        divider: '#C7C7C7',
      },
      borderRadius: {
        none: '0',
        sm: '0',
        md: '0',
        lg: '0',
        full: '0',
      },
      fontFamily: {
        sans: ['General Sans', 'Aileron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
