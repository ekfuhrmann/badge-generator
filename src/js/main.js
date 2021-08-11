import buttons from './partials/buttons';
import params from './partials/params';

// Reserved for scripts
const main = () => {
  params(); // handle parameter queries
  buttons(); // set up buttons

  // const input = document.querySelector('#test');

  // input.addEventListener('change', (e) => {
  //   const reader = new FileReader();
  //   reader.readAsText(e.target.files[0]);
  //   reader.onload = handleFileLoad;
  // });

  // function handleFileLoad(e) {
  //   const base64Data = window.btoa(e.target.result);
  //   const svgURI = `data:image/svg+xml;base64,${base64Data}`;

  //   console.log(svgURI);
  // }
};

document.addEventListener('DOMContentLoaded', main);
