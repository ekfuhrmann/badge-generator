import opentype from 'opentype.js';
import badge from './partials/badge';

// Reserved for scripts
const main = () => {
  const input = document.querySelectorAll('.form__input');
  const formBtn = document.querySelector('.form__btn');

  // build svg on load using default values
  badge(input[0].value, input[1].value);

  // build svg while adding primary input values
  input[0].addEventListener('keyup', (e) => {
    badge(input[0].value, input[1].value);
  });

  // build svg while adding secondary input values
  input[1].addEventListener('keyup', (e) => {
    badge(input[0].value, input[1].value);
  });

  // build svg when clicking button
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    badge(input[0].value, input[1].value);

    // 1. Keep a DOM reference to the SVG element
    var SVGDomElement = document.querySelector('.svg');

    // 2. Serialize element into plain SVG
    var serializedSVG = new XMLSerializer().serializeToString(SVGDomElement);

    // 3. convert svg to base64
    var base64Data = window.btoa(serializedSVG);
    // The generated string will be something like:
    // PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdm.........

    // convert to data URI
    const svgUri = `data:image/svg+xml;base64,${base64Data}`;

    // If you want to display it in the browser via URL:
    console.log(svgUri);
  });
};

document.addEventListener('DOMContentLoaded', main);
