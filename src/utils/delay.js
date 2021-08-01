export const throttle = (func, delay) => {
  let timer = null;

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, delay)
    }
  }
}