export const getUrl = data => Object.keys(data)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
  .join('&');
