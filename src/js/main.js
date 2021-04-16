import htmlToSvg from 'htmlsvg';
import opentype from 'opentype.js';
import { load } from 'opentype.js';

// Reserved for scripts
const main = () => {
  async function make() {
    const font = await opentype.load(
      './assets/fonts/roboto/roboto-medium-webfont.woff'
    );
    const path = font.getPath('FUCK IT', 0, 0, 72);
    console.log(path.toSVG());
  }
  make();

  async function doot() {
    const wrapper = document.querySelector('.wrapper');
    const htmlElement = document.querySelector('.badge');
    const svg = await htmlToSvg(htmlElement);
    // console.log(svg);

    wrapper.appendChild(svg);
  }

  doot();
};

document.addEventListener('DOMContentLoaded', main);

// TODO: Plan is to actually generate the SVG with formatted text inside of it. I'll then calc out the proper spacing so that we can generate tags. The tags will not use flattened text but rather be pulling from imported fonts. Users will also be able to download the svg.

// https://vecta.io/blog/how-to-use-fonts-in-svg#:~:text=Because%20object%20tags%20are%20allowed%20to%20access%20external,will%20not%20be%20able%20to%20access%20these%20imports.
