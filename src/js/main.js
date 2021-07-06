import buttons from './partials/buttons';
import form from './partials/form';

// Reserved for scripts
const main = () => {
  form(); // handle form fields and build SVG preview
  buttons(); // set up buttons
};

document.addEventListener('DOMContentLoaded', main);
