// import htmlToSvg from 'htmlsvg';
import opentype from 'opentype.js';
import { load } from 'opentype.js';
import computeLayout from 'opentype-layout';

const formatText = (text) => {
  return text.toUpperCase().split('').join(' ');
};

const repathData = (data) => {
  const letterSpacing = -0.35;
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
    }
  });
};

// Reserved for scripts
const main = () => {
  const input = document.querySelectorAll('.input');
  const color = document.querySelectorAll('.color');
  const shadowSVG = document.querySelector('.shadowSVG');
  const svgText = document.querySelectorAll('.shadowSVG__text');
  const svgRect = document.querySelectorAll('.shadowSVG__rect');

  async function make(string) {
    const font = await opentype.load(
      './assets/fonts/roboto/roboto-medium-webfont.woff'
    );

    const path = font.getPath(string, 13, 22, 12, { kerning: true });

    console.log(path);

    path.commands = repathData(path.commands);

    const test = document.querySelector('.test');
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

    setText(svgText[0], input[0].value);
    setText(svgText[1], input[1].value);

    make(formatText(input[0].value));
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

document.addEventListener('DOMContentLoaded', main);
