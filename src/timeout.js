const setTimeout = (callback, interval) => {
  let timeout = null;

  return ({
    refresh() {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(callback, interval);
    },
  });
};

export default setTimeout;
