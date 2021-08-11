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
  const label = document.querySelectorAll('.form__input');
  const colors = document.querySelectorAll('[data-type="color"]');
  const iconInput = document.querySelector('#test');

  // build svg on load using default values
  badge(getInputText());

  // build svg while adding primary input values
  label[0].addEventListener('keyup', (e) => {
    // if input has a value
    if (getInputText().primary !== '') {
      // add param
      addParam('plabel', getInputText().primary);
    }

    // build badge
    badge(getInputText());
  });

  // build svg while adding secondary input values
  label[1].addEventListener('keyup', (e) => {
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

  iconInput.addEventListener('change', (e) => {
    let secondaryIcon = document.querySelector('.secondary-icon') || null;

    // verify that an svg file is loaded
    if (!e.target.files[0]) {
      // remove current icon if not
      secondaryIcon.remove();
      return false;
    }

    // set up file reader
    const reader = new FileReader();

    // read file
    reader.readAsText(e.target.files[0]);

    // once file is loaded, handle the data
    reader.onload = handleFileLoad;

    function handleFileLoad(e) {
      // base64 the icon
      const base64Data = window.btoa(e.target.result);

      // convert it to an SVG URI
      const svgURI = `data:image/svg+xml;base64,${base64Data}`;

      // if icon image element does not exist, create it
      if (secondaryIcon == null) {
        secondaryIcon = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'image'
        );

        // provide default attributes
        secondaryIcon.setAttributeNS(null, 'class', 'secondary-icon');
        secondaryIcon.setAttributeNS(null, 'height', '20');
        secondaryIcon.setAttributeNS(null, 'y', '7.5');
        secondaryIcon.setAttributeNS(null, 'href', svgURI);

        // add icon to svg
        const svgEl = document.querySelector('.preview svg');
        svgEl.appendChild(secondaryIcon);
      } else {
        // update icon
        secondaryIcon.setAttributeNS(null, 'href', svgURI);
      }
    }
  });
};

export default form;
