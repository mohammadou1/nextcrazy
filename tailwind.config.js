module.exports = {
   future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
   },
   experimental: {
      applyComplexClasses: true,
   },
   purge: {
      content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
      options: {
         whitelist: ['dir', 'rtl', 'ltr'],
      },
   },
   theme: {},
   variants: {
      float: ['responsive', 'direction'],
      margin: ['responsive', 'direction'],
      padding: ['responsive', 'direction'],
      inset: ['responsive', 'direction'],
   },
   plugins: [require('tailwindcss-dir')()],
};
