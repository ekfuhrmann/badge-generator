import Pickr from '@simonwep/pickr';
import badge, { getInputText } from './badge';
import { addParam } from './params';

const colorPicker = (el, i) => {
  // determine color key based off index
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

  // Create color picker
  const pickr = Pickr.create({
    el: el.querySelector('.color-picker'),
    theme: 'monolith',
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
      // main components
      preview: true,
      opacity: false,
      hue: true,

      // input / output Options
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
    addParam(colorKey(), el.dataset.color);
    badge(getInputText());
    pickr.hide();
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
    // if input has a value
    if (getInputText().primary !== '') {
      // add param
      addParam('plabel', getInputText().primary);
    }

    // build badge
    badge(getInputText());
  });

  // build svg while adding secondary input values
  input[1].addEventListener('keyup', (e) => {
    // if input has a value
    if (
      getInputText().secondary !== '' &&
      getInputText().secondary !== 'Text'
    ) {
      // add param
      addParam('slabel', getInputText().secondary);
    }

    // build badge
    badge(getInputText());
  });

  // build color pickers
  colors.forEach((color, i) => {
    colorPicker(color, i);
  });
};

export default form;
