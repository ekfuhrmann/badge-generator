// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Media Query
function checkMediaQuery(size) {
    let breakpoint;

    // Get sizes based on CSS breakpoints
    switch (size) {
        case 'xs':
            breakpoint = 320;
            break;
        case 'sm':
            breakpoint = 650;
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

    return window.matchMedia( `(min-width: ${breakpoint}px)` ).matches;
}