import Pickr from '@simonwep/pickr';
import badge, { getInputText } from './badge';
import { addParam } from './params';

const url = new URL(window.location.href);

const colorPicker = (el, i) => {
  const colorKey = () => {
    switch (i) {
      case 0:
        return 'pbg';
        break;

      case 1:
        return 'ptext';
        break;

      case 2:
        return 'sbg';
        break;

      case 3:
        return 'stext';
        break;

      default:
        break;
    }
  };

  const pickr = Pickr.create({
    el: el.querySelector('.color-picker'),
    theme: 'monolith', // or 'classic', or 'nano'
    defaultRepresentation: 'HEX',
    lockOpacity: true,
    default: el.dataset.color,

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
    addParam(colorKey(), el.dataset.color);
  });

  return pickr;
};

const form = () => {
  const input = document.querySelectorAll('.form__input');
  const colors = document.querySelectorAll('[data-type="color"]');

  // build svg on load using default values
  badge(getInputText());

  // build svg while adding primary input values
  input[0].addEventListener('keyup', (e) => {
    badge(getInputText());
    addParam('plabel', getInputText().primary);
  });

  // build svg while adding secondary input values
  input[1].addEventListener('keyup', (e) => {
    badge(getInputText());
    addParam('slabel', getInputText().secondary);
  });

  // build color pickers
  colors.forEach((color, i) => {
    colorPicker(color, i);
  });
};

export default form;
