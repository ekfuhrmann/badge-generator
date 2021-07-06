import ClipboardJS from 'clipboard';
import { getInputText } from './badge';

const svgNode = () => {
  // keep a DOM reference to the SVG element
  const svg = document.querySelector('.svg');

  // serialize element into plain SVG
  return new XMLSerializer().serializeToString(svg);
};

const copyMarkdown = () => {
  new ClipboardJS('.button__markdown', {
    text: () => {
      // convert svg to base64
      var base64Data = window.btoa(svgNode());

      // convert to data URI
      const svgUri = `data:image/svg+xml;base64,${base64Data}`;

      // generate markdown for copying
      return `[![forthebadge](${svgUri})](https://forthebadge.com)`;
    },
  });

  // TODO: on success/error show toast
};

const download = () => {
  function createDownloadLink(filename) {
    const el = document.createElement('a');

    // hide link
    el.style.display = 'none';

    // append link to body
    document.body.appendChild(el);

    // set link href to be svg format with encoded URI component
    el.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(svgNode())
    );

    // set link to download using formatted name
    el.setAttribute('download', filename);

    // click link to init download
    el.click();

    // delete link
    document.body.removeChild(el);
  }

  const downloadButton = document.querySelector('.button__download');

  downloadButton.addEventListener('click', (e) => {
    e.preventDefault();

    // combine primary and secondary name
    const downloadName = `${getInputText().primary}${
      getInputText().secondary ? ' ' + getInputText().secondary : ''
    }.svg`;

    // replace spaces with dashes and set to lowercase
    const filename = downloadName.toLowerCase().replace(/\s+/g, '-');

    // create hidden download link
    createDownloadLink(filename);
  });
};

const share = () => {
  // const urlSearchParams = new URLSearchParams(window.location.search);
  // const params = Object.fromEntries(urlSearchParams.entries());

  const shareButton = document.querySelector('.button__share');

  shareButton.addEventListener('click', (e) => {
    e.preventDefault();
    const colors = document.querySelectorAll('[data-type="color"]');

    const params = {
      plabel: getInputText().primary,
      pbg: colors[0].dataset.color,
      ptext: colors[1].dataset.color,
      slabel: getInputText().secondary,
      sbg: colors[2].dataset.color,
      stext: colors[3].dataset.color,
    };

    console.log(params);
  });
};

const buttons = () => {
  download();
  copyMarkdown();
  // share(); //TODO: remove?
};

export default buttons;
