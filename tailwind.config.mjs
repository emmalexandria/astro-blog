import { HEADER_LINK_CLASSES } from './src/consts';
import { themeVariants } from 'tailwindcss-theme-variants';
import { darkTheme, getTwThemes, highContrastTheme, themes } from "./src/themes"

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
      },
      colors: {
        mono: {
          '50': '#FEFEFE',
          '100': '#E1E1E1',
          '200': '#C4C4C4',
          '300': '#A7A7A7',
          '400': '#8A8A8A',
          '500': '#6d6d6d',
          '600': '#5E5E5E',
          '700': '#4F4F4F',
          '800': '#414141',
          '900': '#323232',
          '950': '#232323',
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
        content: '70ch'
      },
      listStyleType: {
        roman: 'upper-roman'
      }
    },
    borderWidth: {
      sm: '1px',
      DEFAULT: '1.5px',
      md: '1.5px',
      lg: '2px'
    }
  },
  safelist: ['sr-only', 'heading-link'],
  plugins: [themeVariants({
    themes: getTwThemes([darkTheme.get(), highContrastTheme.get()])
  })],
}
