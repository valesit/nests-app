import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors from Figma Design
        primary: {
          DEFAULT: '#0B4F6C',
          blue: '#0B4F6C',
          teal: '#01BAEF',
          green: '#20BF55',
        },
        // Accent Colors
        accent: {
          yellow: '#FDB92C',
        },
        // Custom color names for easier use
        'nests-blue': '#0B4F6C',
        'nests-teal': '#01BAEF',
        'nests-green': '#20BF55',
        'nests-yellow': '#FDB92C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0B4F6C 0%, #01BAEF 50%, #20BF55 100%)',
        'gradient-blue': 'linear-gradient(90deg, #0B4F6C 0%, #01BAEF 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
