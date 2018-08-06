'use strict';

module.exports = {
  productionExtension: '.html',
  // Our main dist folder
  distFolder: './dist',
  // Here you add the paths to the scss files you get with Bower to import and work with.
  scssIncludes: ['./node_modules/'],
  scriptFiles: ['./src/scripts/main.js'],
  // Path to un-worked font files
  fonts: ['./src/fonts/*.otf', './src/fonts/*.ttf'],
  // Asset File Paths
  assets: ['./src/assets/**/*', '!./src/assets/images/**/*'],
  // Asset File Paths
  favicons: ['./src/favicons/**/*']
};
