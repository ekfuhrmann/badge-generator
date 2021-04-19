// import htmlToSvg from 'htmlsvg';
import opentype from 'opentype.js';
import { load } from 'opentype.js';
import computeLayout from 'opentype-layout';

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

  async function make() {
    // const doop = await opentype.load(
    //   './assets/fonts/roboto/roboto-medium-webfont.woff',
    //   (err, font) => {
    //     if (err) throw err;

    //     var fontSizePx = 12;
    //     var text = 'Fuck It';
    //     var scale = (1 / font.unitsPerEm) * fontSizePx;

    //     // Layout some text - notice everything is in em units!
    //     var result = computeLayout(font, text, {
    //       letterSpacing: 3 * font.unitsPerEm, // '2.5em' in font units
    //     });

    //     // Array of characters after layout
    //     console.log(result.glyphs);

    //     // Computed height after word-wrap
    //     console.log(result.height);

    //     return result;
    //   }
    // );

    const font = await opentype.load(
      './assets/fonts/roboto/roboto-medium-webfont.woff'
    );

    const doink = computeLayout(font, 'Fuck It');
    console.log(doink);

    const path = font.getPath('FUCK IT', 13, 22, 12, { kerning: false });

    console.log(path);
    console.log(path.toPathData());
    const test = document.querySelector('.test');
    test.setAttributeNS(null, 'd', path.toPathData());
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
    make();
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
