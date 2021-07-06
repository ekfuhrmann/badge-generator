const url = new URL(window.location.href);

export const addParam = (key, value) => {
  url.searchParams.set(key, value);
  console.log(url.search); // <== '?key=value'
};
