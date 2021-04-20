// import htmlToSvg from 'htmlsvg';
import opentype from 'opentype.js';
import { load } from 'opentype.js';
import computeLayout from 'opentype-layout';

const repathData = (data) => {
  const letterSpacing = -0.25;
  let mCount = -1;
  let mPos;

  return data.map(({ x, y, x1, y1, x2, y2, type }, index) => {
    switch (type) {
      case 'Z':
        return { type };
      case 'M':
        console.log({ mPos, x });
        if (y == 22 || mPos + 3 < x) {
          mPos = x;
          mCount++;
        }
        return {
          type,
          x: (x || 0) + mCount * letterSpacing,
          ...(y === undefined ? {} : { y }),
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

      // if ((type === 'M' && y == 22) || (type === 'M' && y == 22)) {
      //   mCount++;
      // }

      // if (type === 'Z') {
      //   return {
      //     type,
      //   };
      // }

      // return {
      //   type,

      //   x: (x || 0) + mCount * 5,

      //   ...(y === undefined ? {} : { y }),

      //   ...(x1 === undefined ? {} : { x1 }),

      //   ...(y1 === undefined ? {} : { y1 }),
      // };
    }
  });
};

function spacePath(path) {
  let mCount = -1;

  return path
    .map((command, index) => {
      const x = String(command.x + mCount * 20);
      const x1 = String(command.x1 + mCount * 20);
      const x2 = String(command.x2 + mCount * 20);
      const y = String(command.y);
      const type = command.type;

      switch (type) {
        case 'Z':
          return type;
        case 'M':
          // console.log(y);
          if (y == 22) {
            mCount++;
            return [type + String(command.x + mCount * 20), y];
          }
        case 'L':
          return [type + x, y].join(' ');
        case 'Q':
          return [type + x1, String(command.y1), x, y].join(' ');
        case 'C':
          return [
            type + x1,
            String(command.y1),
            x2,
            String(command.y2),
            x,
            y,
          ].join(' ');
        default:
          throw new Error('invalid glyph path type: ' + type);
      }
    })
    .join(' ');
}

// Reserved for scripts
const main = () => {
  // =============-=-=-=-=-==--=-=-=-=-=
  // const text = document.querySelector('.cls-3');
  // const width = text.getBBox().width();
  // console.log(width);

  const input = document.querySelectorAll('.input');
  const color = document.querySelectorAll('.color');
  const shadowSVG = document.querySelector('.shadowSVG');
  const svgText = document.querySelectorAll('.shadowSVG__text');
  const svgRect = document.querySelectorAll('.shadowSVG__rect');

  async function make(string) {
    // const doop = await opentype.load(
    //   './assets/fonts/roboto/roboto-medium-webfont.woff',
    //   (err, font) => {
    //     if (err) throw err;

    //     var fontSizePx = 12;
    //     var text = 'Fuck It';
    //     var scale = (1 / font.unitsPerEm) * fontSizePx;

    //     // Layout some text - notice everything is in em units!
    // var result = computeLayout(font, 'Fuck', {
    // letterSpacing: 3 * font.unitsPerEm, // '2.5em' in font units
    // });

    //     // Array of characters after layout
    // console.log(result.glyphs);

    //     // Computed height after word-wrap
    //     console.log(result.height);

    //     return result;
    //   }
    // );

    const font = await opentype.load(
      './assets/fonts/roboto/roboto-medium-webfont.woff'
    );

    // const doink = computeLayout(font, 'Fuck It', {
    //   lineHeight: 2 * font.unitsPerEm, // '2.5em' in font units
    // });
    // console.log(doink);
    // console.log(doink.glyphs[0].data.getPath());

    // console.log(getSvgPath(doink.glyphs[0].data.getPath()));

    const path = font.getPath(string, 13, 22, 12);

    // console.log(font.glyphs);

    // const doot = computeLayout(path);

    // console.log('doot', doot);

    console.log(path);

    path.commands = repathData(path.commands);
    //
    // console.log(path.toPathData());

    // console.log(spacePath(path.commands));
    const test = document.querySelector('.test');
    // test.setAttributeNS(null, 'd', spacePath(path.commands));
    test.setAttributeNS(null, 'd', path.toPathData());
    // test.setAttributeNS(null, 'd', getSvgPath(doink.glyphs[0].data.getPath()));
  }

  input[0].addEventListener('keyup', (e) => {
    setText(svgText[0], e.target.value);
  });

  input[1].addEventListener('keyup', (e) => {
    setText(svgText[1], e.target.value);
  });

  const formBtn = document.querySelector('.btn');

  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('sub');
    make('F U C K   I T');
  });

  function setText(el, value) {
    el.textContent = value.toUpperCase();

    setTimeout(() => {
      generateSvg();
    }, 10);
  }

  function generateSvg() {
    const primaryTextSize = svgText[0].getBBox().width;
    const secondaryTextSize = svgText[1].getBBox().width;
    const primaryColor = color[0];
    const totalSize = 0;

    shadowSVG.setAttributeNS(
      null,
      'viewBox',
      `0 0 ${primaryTextSize + secondaryTextSize + 52} 35`
    );
    shadowSVG.setAttributeNS(
      null,
      'width',
      primaryTextSize + secondaryTextSize + 52
    );
    svgRect[0].setAttributeNS(
      null,
      'width',
      primaryTextSize ? primaryTextSize + 26 + (secondaryTextSize ? 2 : 0) : 0
    );
    svgRect[0].setAttributeNS(null, 'fill', color[0].value);
    svgRect[1].setAttributeNS(null, 'fill', color[1].value);
    svgRect[1].setAttributeNS(
      null,
      'width',
      secondaryTextSize ? secondaryTextSize + 26 : 0
    );
    svgRect[1].setAttributeNS(null, 'x', primaryTextSize + 26);
    svgText[1].setAttributeNS(null, 'x', primaryTextSize + 39);
  }

  const generateSVG = document.querySelector('.generateSVG');

  const tagPrimary = document.querySelector(
    '.badge__tagline[data-type="primary"]'
  );
  const tagSecondary = document.querySelector(
    '.badge__tagline[data-type="secondary"]'
  );
};

class Svg {
  constructor() {}
}

document.addEventListener('DOMContentLoaded', main);

// TODO: New plan is to have the user input and generate the badge via html dom element. We can than use math to calculate the spacing for the SVG which should work great. One key thing to remember is that CSS letter-spacing is applied to the last letter, so we also need to subtract that spacing from the final value in order to get an accurate word width calculation. Once that is taken care of, we can simply add the necessary padding and generate the SVG.

// I think it would be best to handle the entire SVG styling via html node, and then convert that into an SVG once they have submitted the words/color styles.

// https://vecta.io/blog/how-to-use-fonts-in-svg#:~:text=Because%20object%20tags%20are%20allowed%20to%20access%20external,will%20not%20be%20able%20to%20access%20these%20imports.
