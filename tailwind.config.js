/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#427CA2",   // bleu — boutons principaux, liens, header
          accent: "#FD9089",    // corail — actions importantes, badges, CTA
          secondary: "#E5B699", // beige/pêche — éléments secondaires, hover
          sand: "#E9D1A9",      // sable — fonds de section, cartes
          muted: "#9AACB5",     // bleu-gris — texte secondaire, bordures, icônes désactivées
        },
      },
    },
  },
  plugins: [],
};
