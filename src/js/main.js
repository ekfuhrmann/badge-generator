import Pickr from '@simonwep/pickr';
import opentype from 'opentype.js';
import badge from './partials/badge';

// Reserved for scripts
const main = () => {
  function createColor(el) {
    // TODO: Figure out how to actually format this mess of a file cleaner
    const getDefaultColor = () => {
      switch (el.dataset.name) {
        case 'Primary Background Color':
          return '#31c4f3';
          break;

        case 'Primary Text Color':
          return '#FFFFFF';
          break;

        case 'Secondary Background Color':
          return '#389ad5';
          break;

        case 'Secondary Text Color':
          return '#FFFFFF';
          break;
      }
    };

    const pickr = Pickr.create({
      el: el.querySelector('.color-picker'),
      theme: 'monolith', // or 'classic', or 'nano'
      defaultRepresentation: 'HEX',
      lockOpacity: true,
      default: getDefaultColor(),

      swatches: [
        '#a7bfc1',
        '#5593c7',
        '#3bc4f3',
        '#3c9ad5',
        '#3ac1d0',
        '#45a4b8',
        '#88c7d4',
        '#005384',
        '#c1d72f',
        '#5d9741',
        '#8fc965',
        '#419b5a',
        '#ea4560',
        '#c13b3a',
        '#e46c17',
        '#d35b09',
        '#ffffff',
        '#000000',
      ],

      components: {
        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
          hex: false,
          rgba: false,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true,
        },
      },
    });

    pickr.on('init', () => {
      el.dataset.color = pickr.getColor().toHEXA().toString();
      badge(getInputText());
    });

    pickr.on('save', () => {
      el.dataset.color = pickr.getColor().toHEXA().toString();
      badge(getInputText());
      pickr.hide();
    });

    // console.log(pickr.getColorRepresentation());
    return pickr;
  }

  createColor(document.querySelector('[data-name="Primary Background Color"]'));
  createColor(document.querySelector('[data-name="Primary Text Color"]'));
  createColor(
    document.querySelector('[data-name="Secondary Background Color"]')
  );
  createColor(document.querySelector('[data-name="Secondary Text Color"]'));

  const input = document.querySelectorAll('.form__input');
  const formBtn = document.querySelector('.form__btn');
  function getInputText() {
    return {
      primary:
        input[0].value !== '' || input[1].value !== ''
          ? input[0].value
          : input[0].placeholder,
      secondary:
        input[1].value !== '' || input[0].value !== ''
          ? input[1].value
          : input[1].placeholder,
    };
  }

  console.log(input[0].placeholder);

  // build svg on load using default values
  badge(getInputText());

  // build svg while adding primary input values
  input[0].addEventListener('keyup', (e) => {
    badge(getInputText());
  });

  // build svg while adding secondary input values
  input[1].addEventListener('keyup', (e) => {
    badge(getInputText());
  });

  // build svg when clicking button
  // formBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   badge(getInputText);

  //   // 1. Keep a DOM reference to the SVG element
  //   var SVGDomElement = document.querySelector('.svg');

  //   // 2. Serialize element into plain SVG
  //   var serializedSVG = new XMLSerializer().serializeToString(SVGDomElement);

  //   // 3. convert svg to base64
  //   var base64Data = window.btoa(serializedSVG);
  //   // The generated string will be something like:
  //   // PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdm.........

  //   // convert to data URI
  //   const svgUri = `data:image/svg+xml;base64,${base64Data}`;

  //   // If you want to display it in the browser via URL:
  //   console.log(svgUri);
  // });
};

document.addEventListener('DOMContentLoaded', main);
