/**
 * IMPORTANT: If you are using this function and need to test
 * against multiple breakpoints, be sure to start with the LARGEST
 * breakpoint and then work your way down to smaller sizes.
 */
export const checkMediaQuery = size => {
  let breakpoint;

  // Get sizes based on CSS breakpoints
  switch (size) {
    case 'xs':
      breakpoint = 380;
      break;
    case 'sm':
      breakpoint = 550;
      break;
    case 'md':
      breakpoint = 768;
      break;
    case 'lg':
      breakpoint = 1024;
      break;
    case 'xl':
      breakpoint = 1440;
      break;

    // if not using a CSS breakpoint, use parameter for size
    default:
      breakpoint = size;
  }

  return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
};

export const throttle = (func, limit, ...args) => {
  let lastFunc;
  let lastRan;

  return function() {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);

      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
