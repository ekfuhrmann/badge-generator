import buttons from './partials/buttons';
import params from './partials/params';

// Reserved for scripts
const main = () => {
  params(); // handle parameter queries
  buttons(); // set up buttons
};

document.addEventListener('DOMContentLoaded', main);
