const nextBuildId = require('next-build-id');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
   generateBuildId: () => nextBuildId({ dir: __dirname, describe: true }),
   images: {
      domains: [
         'source.unsplash.com',
         'images.unsplash.com',
         'test.halayalla.com',
         'halayalla.com',
         'storage.sharek.sa',
         'app.halayalla.com',
      ],
   },

   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         issuer: {
            test: /\.(js|ts)x?$/,
         },
         use: [
            {
               loader: '@svgr/webpack',
               options: {
                  svgo: false,
               },
            },
         ],
      });

      return config;
   },
});
