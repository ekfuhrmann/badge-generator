import createInview from './providers/inview.js';
import createViewport from './providers/viewport.js';

import enter from './handlers/enter.js';
import parallax from './handlers/parallax.js';
import video from './handlers/video.js';

import router from './router.js';

const main = () => {
  // setup router
  router();

  // create viewport singleton
  const viewport = createViewport();

  // create inview singleton, passing in an array of check functions
  const checkFuncs = [enter(viewport), parallax(viewport), video(viewport)];

  const inview = createInview(checkFuncs);
};

document.addEventListener('DOMContentLoaded', main);
