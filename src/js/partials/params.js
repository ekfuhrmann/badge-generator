import form from './form';

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);

// modify search query param in URL
export const addParam = (key, value) => {
  url.searchParams.set(key, value);
};

// get current params
export const getParams = () => {
  return url.search;
};

// remove specific param
export const removeParam = (key) => {
  url.searchParams.delete(key);
};

const params = () => {
  // check if search params exist
  if (getParams()) {
    // clear params from url (on page load)
    window.history.replaceState(
      {},
      '',
      '/' +
        window.location.href
          .substring(window.location.href.lastIndexOf('/') + 1)
          .split('?')[0]
    );

    // update default form states based on params
    searchParams.forEach((value, key) => {
      const input = document.querySelectorAll('.form__input');
      const colors = document.querySelectorAll('[data-type="color"]');

      switch (key) {
        case 'plabel':
          input[0].value = value;
          break;

        case 'slabel':
          input[1].value = value;
          break;

        case 'pbg':
          colors[0].dataset.color = value;
          break;

        case 'ptext':
          colors[1].dataset.color = value;
          break;

        case 'sbg':
          colors[2].dataset.color = value;
          break;

        case 'stext':
          colors[3].dataset.color = value;
          break;

        default:
          break;
      }
      addParam(key, value);
    });
  }

  form(); // handle form fields and build SVG preview
};

export default params;
