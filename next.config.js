const nextBuildId = require('next-build-id');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
   generateBuildId: () => nextBuildId({ dir: __dirname, describe: true }),
   images: {
      domains: ['source.unsplash.com', 'images.unsplash.com'],
   },

   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
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
