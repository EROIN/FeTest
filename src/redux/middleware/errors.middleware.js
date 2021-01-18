export const fsaErrorLogger = () => (next) => (action) => {
  // for all actions received that comply with the FSA spec,
  // just push the error to console
  if (action.error === true) {
    try {
      console.log(`Promise-generating redux action ${action.type} threw an error: ${action.payload}`); // eslint-disable-line no-console
    } catch (error) {
      return next(action);
    }
  }
  return next(action);
};
