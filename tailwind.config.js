/** @type {import('tailwindcss').Config} */
import prelinePlugin from 'preline/plugin';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this matches your project structure
    "./public/index.html",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    prelinePlugin
  ],
}

