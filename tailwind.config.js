/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // WICHTIG: Darkmode über Klassen steuern
  content: ["./*.html", "./js/*.js"], // Stelle sicher, dass Tailwind alle Dateien scannt
  theme: {
    extend: {},
  },
  plugins: [],
}
