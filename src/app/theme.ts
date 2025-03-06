import type { Config } from 'tailwindcss'
import { themePlugin } from './theme-plugin'

export const themePreset = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [],
  plugins: [ themePlugin, themePlugin],
} satisfies Config
