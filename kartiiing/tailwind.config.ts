import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",  // 1440px
        "9xl": "100rem", // 1600px
      },
    },
  },
  plugins: [],
};

export default config;