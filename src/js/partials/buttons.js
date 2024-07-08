import ClipboardJS from 'clipboard';
import { getInputText } from './badge';
import { getParams } from './params';
import { toast } from './toast';

const svgNode = () => {
  // keep a DOM reference to the SVG element
  const svg = document.querySelector('.preview svg');

  // serialize element into plain SVG
  return new XMLSerializer().serializeToString(svg);
};

const copyMarkdown = () => {
  const clipboard = new ClipboardJS(
    '.preview__button[data-action="markdown"]',
    {
      text: () => {
        // convert svg to base64
        const base64Data = window.btoa(svgNode());

        // convert to data URI
        const svgUri = `data:image/svg+xml;base64,${base64Data}`;

        // generate markdown for copying
        return `[![forthebadge](${svgUri})](https://for-the-badge-ef.netlify.app/)`;
      },
    }
  );

  clipboard.on('success', (e) => {
    // display toast notification
    toast('Markdown Copied To Clipboard!', 'code');
    e.clearSelection();
  });

  clipboard.on('error', (e) => {
    // display toast notification
    toast('Failed To Copy Markdown!', 'error');
  });
};

const download = () => {
  // generate a link node for download (since trigger is button)
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

    // display toast notification
    toast('Initiated Badge Download!', 'download');
  }

  document
    .querySelector('.preview__button[data-action="download"]')
    .addEventListener('click', (e) => {
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
  const clipboard = new ClipboardJS('.preview__button[data-action="share"]', {
    text: () => {
      // get url
      // let url = window.location.href;
      // remove any trailing slash if needed
      // url = url.endsWith('/') ? url.slice(0, -1) : url;

      // copy url + search params to clipboard
      return window.location.href + (getParams() ? `${getParams()}` : '');
    },
  });

  clipboard.on('success', (e) => {
    // display toast notification
    toast('Share Link Copied To Clipboard!', 'share');
    e.clearSelection();
  });

  clipboard.on('error', (e) => {
    // display toast notification
    toast('Failed To Copy Share Link!', 'error');
  });
};

const buttons = () => {
  copyMarkdown();
  download();
  share();
};

export default buttons;
