import {themePreset} from './src/app/theme'
module.exports = {
    mode: 'jit',
    content: [
        './src/**/*.{js,ts,jsx,tsx}', // 0kB
    ],
    purge: [],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    presets: [themePreset],
    variants: {
        extend: {},
    },
    plugins: [],
}