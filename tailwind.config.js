module.exports = {
   future: {
      removeDeprecatedGapUtilities: true,
   },
   purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
   theme: {},
   variants: {
      float: ['responsive', 'direction'],
      margin: ['responsive', 'direction'],
      padding: ['responsive', 'direction'],
      inset: ['responsive', 'direction'],
   },
   plugins: [require('tailwindcss-dir')()],
};
