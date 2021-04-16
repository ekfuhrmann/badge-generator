import htmlToSvg from 'htmlsvg';
import opentype from 'opentype.js';
import { load } from 'opentype.js';

// Reserved for scripts
const main = () => {
  // async function make() {
  //   const font = await opentype.load(
  //     './assets/fonts/roboto/roboto-medium-webfont.woff'
  //   );
  //   const path = font.getPath('FUCK IT', 0, 0, 72);
  //   console.log(path.toSVG());
  // }
  // make();

  // async function doot() {
  //   const wrapper = document.querySelector('.wrapper');
  //   const htmlElement = document.querySelector('.badge');
  //   const svg = await htmlToSvg(htmlElement);
  //   // console.log(svg);

  //   wrapper.appendChild(svg);
  // }

  // doot();

  // =============-=-=-=-=-==--=-=-=-=-=
  // const text = document.querySelector('.cls-3');
  // const width = text.getBBox().width();
  // console.log(width);

  const inputPrimary = document.querySelector('.doot[data-type="primary"]');
  const inputSecondary = document.querySelector('.doot[data-type="secondary"]');

  inputPrimary.addEventListener('keyup', (e) => {
    const svgTextPrimary = document.querySelector(
      '.shadowSVG__text[data-type="primary"]'
    );

    setText(svgTextPrimary, e.target.value);
  });

  inputSecondary.addEventListener('keyup', (e) => {
    const svgTextSecondary = document.querySelector(
      '.shadowSVG__text[data-type="secondary"]'
    );

    setText(svgTextSecondary, e.target.value);
  });

  function setText(el, value) {
    el.textContent = value.toUpperCase();
  }
};

document.addEventListener('DOMContentLoaded', main);

// TODO: New plan is to have the user input and generate the badge via html dom element. We can than use math to calculate the spacing for the SVG which should work great. One key thing to remember is that CSS letter-spacing is applied to the last letter, so we also need to subtract that spacing from the final value in order to get an accurate word width calculation. Once that is taken care of, we can simply add the necessary padding and generate the SVG.

// I think it would be best to handle the entire SVG styling via html node, and then convert that into an SVG once they have submitted the words/color styles.

// https://vecta.io/blog/how-to-use-fonts-in-svg#:~:text=Because%20object%20tags%20are%20allowed%20to%20access%20external,will%20not%20be%20able%20to%20access%20these%20imports.
