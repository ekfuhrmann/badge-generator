import opentype from 'opentype.js';
import badge from './partials/badge';

// Reserved for scripts
const main = () => {
  const input = document.querySelectorAll('.input');
  const formBtn = document.querySelector('.btn');

  // build svg on load using default values
  badge(input[0].value, input[1].value);

  // build svg while adding primary input values
  input[0].addEventListener('keyup', (e) => {
    badge(input[0].value, input[1].value);
  });

  // build svg while adding secondary input values
  input[1].addEventListener('ke9yup', (e) => {
    badge(input[0].value, input[1].value);
  });

  // build svg when clicking button
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    badge(input[0].value, input[1].value);
  });
};

document.addEventListener('DOMContentLoaded', main);
