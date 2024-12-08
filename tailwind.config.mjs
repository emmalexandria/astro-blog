/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["Vollkorn Variable", "serif"],
        body: ["'Exo 2 Variable'", "sans-serif"],
        mono: ["Overpass Mono", "monospaced"]
      },
      fontSize: {
        body: ["1rem", { lineHeight: 1.6, letterSpacing: "0.04em" }],
        mono: ["1rem", { lineHeight: 1.6, letterSpacing: "0.00em" }]
      },
      colors: {
        mono: {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#262626',
        },
        primary: {
          '50': '#fff8ed',
          '100': '#fef0d6',
          '200': '#fcddac',
          '300': '#f9c478',
          '400': '#f6a041',
          '500': '#f3841c',
          '600': '#e46a12',
          '700': '#bd5011',
          '800': '#963f16',
          '900': '#793515',
          '950': '#411909',
        },
      },
      spacing: {
        content: '80ch'
      },

    },
    borderWidth: {
      sm: '1px',
      DEFAULT: '1.5px',
      md: '1.5px',
      lg: '2px'
    }
  }, plugins: [],
}
