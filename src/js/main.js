// import htmlToSvg from 'htmlsvg';
import opentype from 'opentype.js';
import { badge, fontPaths, pathGenerator } from './partials/svgPath';

// Reserved for scripts
const main = () => {
  const input = document.querySelectorAll('.input');
  const color = document.querySelectorAll('.color');
  const shadowSVG = document.querySelector('.shadowSVG');
  // const svgText = document.querySelectorAll('.shadowSVG__text');
  const svgRect = document.querySelectorAll('.shadowSVG__rect');
  const svgText = document.querySelectorAll('.text');

  // async function make(string) {
  //   const font = await opentype.load(
  //     './assets/fonts/roboto/roboto-medium-webfont.woff'
  //   );

  //   const path = font.getPath(string, 13, 22, 12, { kerning: true });

  //   console.log(path);

  //   // test.setAttributeNS(null, 'd', getSvgPath(doink.glyphs[0].data.getPath()));
  // }

  input[0].addEventListener('keyup', (e) => {
    // setText(svgText[0], e.target.value);

    fontPaths({ primary: 'drink', secondary: 'd' });

    pathGenerator(e.target.value, 'primary').then((res) => {
      svgText[0].setAttributeNS(null, 'd', res.doot);

      setTimeout(() => {
        badge(res.size);
      }, 10);
    });
  });

  input[1].addEventListener('keyup', (e) => {
    // setText(svgText[1], e.target.value);
    const text = e.target.value;

    pathGenerator(text, 'secondary').then((res) => {
      svgText[1].setAttributeNS(null, 'd', res.doot);

      setTimeout(() => {
        badge(res.size);
      }, 10);
    });
  });

  const formBtn = document.querySelector('.btn');

  formBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // setText(svgText[0], input[0].value);
    // setText(svgText[1], input[1].value);

    // make(formatText(input[0].value));

    pathGenerator(input[0].value, 'primary').then((res) => {
      svgText[0].setAttributeNS(null, 'd', res.doot);
    });

    pathGenerator(input[1].value, 'secondary').then((res) => {
      svgText[1].setAttributeNS(null, 'd', res.doot);
    });
  });

  function setText(el, value) {
    text.toUpperCase().split('').join(' ');

    setTimeout(() => {
      generateSvg();
    }, 10);
  }

  function generateSvg() {
    const primaryTextSize = svgText[0].getBBox().width;
    const secondaryTextSize = svgText[1].getBBox().width;

    console.log(primaryTextSize);

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
