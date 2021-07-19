import opentype from 'opentype.js';

/**
 * In order to properly identify each letterform within
 * a  path so that I can manually apply letter-spacing,
 * I'm adding a space between each letter value, and then
 * using pathSpacing() to test each `M` type against the
 * prior `M` type based on the distance from one another.
 * This allows me to differentiate interior `M` types in
 * a letterform such as the interior path in the letter A,
 * from other `M` types which represent new letterforms.
 * As such if I know the space from one `M` type to another
 * is > than a set value, it must be a new letterform, in
 * which case I want to apply specified letter-spacing.
 */

// formats text prior to adding letter-spacing
const formatText = (text) => {
  return text.toUpperCase().split('').join(' ');
};

// mutates the path to account for the proper letter-spacing
const pathSpacing = (data) => {
  const letterSpacing = -0.35; // reducing spacing slightly due to the added spaces
  let mCount = -1; // iterates up on each new letterform
  let mPos; // prior M type position to test against

  return data.map(({ x, y, x1, y1, x2, y2, type }, index) => {
    switch (type) {
      case 'Z':
        return { type };
      case 'M':
        if (mPos + 3 < x) {
          mPos = x;
          mCount++;
        }
        return {
          type,
          x: (x || 0) + mCount * letterSpacing,
          y,
        };
      case 'L':
        return {
          type,
          x: (x || 0) + mCount * letterSpacing,
          y,
        };
      case 'Q':
        return {
          type,
          x1: (x1 || 0) + mCount * letterSpacing,
          y1,
          x: (x || 0) + mCount * letterSpacing,
          y,
        };
      case 'C':
        return {
          type,
          x1: (x1 || 0) + mCount * letterSpacing,
          y1,
          x2: (x2 || 0) + mCount * letterSpacing,
          y2,
          x: (x || 0) + mCount * letterSpacing,
          y,
        };
      default:
        throw new Error('invalid glyph path type: ' + type);
    }
  });
};

// converts text to path and returns the size of the path
const textToPath = async ({ text, type, offset = 0 }) => {
  const primaryFont = './assets/fonts/roboto/roboto-medium-webfont.woff';
  const secondaryFont =
    './assets/fonts/montserrat/montserrat-extrabold-webfont.woff';

  const font = await opentype.load(
    type === 'secondary' ? secondaryFont : primaryFont
  );

  // use opentype.js to convert text to path
  const path = font.getPath(
    formatText(text),
    offset ? offset + 39 : 13,
    22,
    12
  );

  // update path to incorporate letter-spacing
  path.commands = pathSpacing(path.commands);

  // get path size (width) rounded up 2 decimal places
  const size =
    path.getBoundingBox().x2.toFixed(2) - path.getBoundingBox().x1.toFixed(2);

  return {
    path: path.toPathData(),
    size,
  };
};

export const getInputText = () => {
  const input = document.querySelectorAll('.form__input');

  return {
    primary:
      input[0].value.trim() !== '' || input[1].value.trim() !== ''
        ? input[0].value.trim()
        : input[0].placeholder,
    secondary:
      input[1].value.trim() !== '' || input[0].value.trim() !== ''
        ? input[1].value.trim()
        : input[1].placeholder,
  };
};

const previewState = () => {
  const buttons = document.querySelectorAll('.preview__button');
  const preview = document.querySelector('.preview');
};

const badge = async (text) => {
  const svg = document.querySelector('.preview svg');
  const svgRect = document.querySelectorAll('.svg__rect');
  const svgText = document.querySelectorAll('.svg__text');
  const color = document.querySelectorAll('[data-type="color"]');

  // draw primary text path
  const primary = await textToPath({
    text: text.primary,
    type: 'primary',
  });

  // draw secondary text path
  const secondary = await textToPath({
    text: text.secondary,
    type: 'secondary',
    offset: primary.size,
  });

  // update svg attributes based on path size + padding
  svg.setAttributeNS(
    null,
    'viewBox',
    `0 0 ${
      (primary.size ? primary.size + 26 : 0) +
      (secondary.size ? secondary.size + 26 : 0)
    } 35`
  );
  svg.setAttributeNS(
    null,
    'width',
    (primary.size ? primary.size + 26 : 0) +
      (secondary.size ? secondary.size + 26 : 0)
  );

  // update path 'd' attribute
  svgText[0].setAttributeNS(null, 'd', primary.path);
  svgText[1].setAttributeNS(null, 'd', secondary.path);

  /**
   * the following primary rect has a special conditional
   * in there to add 2px of overflow in the case there is
   * a secondary path. The reason for this is to account
   * for subpixel rendering which can cause a white line
   * to appear at certain sizes. By adding a slight bleed
   * to the rect, we no longer need to worry about the
   * subpixel render problem
   */

  // update rect attributes (color, width, position)
  svgRect[0].setAttributeNS(
    null,
    'width',
    primary.size ? primary.size + 26 + (secondary.size ? 2 : 0) : 0
  );
  svgRect[0].setAttributeNS(null, 'fill', color[0].dataset.color);
  svgText[0].setAttributeNS(null, 'fill', color[1].dataset.color);
  svgRect[1].setAttributeNS(
    null,
    'width',
    secondary.size ? secondary.size + 26 : 0
  );
  svgRect[1].setAttributeNS(null, 'fill', color[2].dataset.color);
  svgText[1].setAttributeNS(null, 'fill', color[3].dataset.color);
  svgText[1].setAttributeNS(null, 'x', primary.size + 39);
  svgRect[1].setAttributeNS(null, 'x', primary.size ? primary.size + 26 : 0);

  // enable/disable preview
  previewState();
};

export default badge;
