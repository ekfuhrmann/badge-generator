import form from './form';

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);

// Modify search query param in URL
export const addParam = (key, value) => {
  url.searchParams.set(key, value);
  window.history.replaceState({}, '', url.search); // update url
};

const removeParam = (key) => {
  // TODO: figure out how to purge all search params (currently leaving up 1 param)
  url.searchParams.delete(key);
  console.log(url.search);
  window.history.replaceState({}, '', url.search); // update url
};

const params = () => {
  // modify default form states based on params
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

    removeParam(key);
  });

  form(); // handle form fields and build SVG preview
};

export default params;
