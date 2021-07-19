export const toast = (message, icon) => {
  const toasts = document.querySelector('.toasts');
  const el = document.createElement('li');
  el.classList.add('toast');
  el.innerText = message;

  function svg() {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.classList.add('toast__icon');

    const node = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    node.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `#${icon}`
    );

    el.appendChild(node);

    return el;
  }

  el.appendChild(svg());
  toasts.appendChild(el);

  setTimeout(() => {
    toasts.removeChild(el);
  }, 5000);
};
