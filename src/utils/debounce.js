export const debounce = (func, delay = 1000) => {
  let timer;
  // returning the function that will be called at the provided delay
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
