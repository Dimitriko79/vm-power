/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(240, 5%, 84%)",
        input: "hsl(240, 5%, 96%)",
        ring: "hsl(240, 5%, 70%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(240, 10%, 4%)",
        card: "hsl(0, 0%, 100%)",
        "card-foreground": "hsl(240, 10%, 4%)",
        muted: "hsl(240, 5%, 96%)",
        "muted-foreground": "hsl(240, 5%, 64%)",
      },
    },
  },
  plugins: [],
}