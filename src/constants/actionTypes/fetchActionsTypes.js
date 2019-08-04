export default name => ({
  FETCH_START: {
    type: `${name}_FETCH_START`,
  },
  FETCH_SUCCESS: {
    type: `${name}_FETCH_SUCCESS`,
  },
  FETCH_ERROR: {
    type: `${name}_FETCH_ERROR`,
  },
});
