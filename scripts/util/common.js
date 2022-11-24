export const wait = (sec) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000));
