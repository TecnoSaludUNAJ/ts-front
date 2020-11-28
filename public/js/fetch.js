import { session, logOut } from "./usuario/session.js";

window.originalFetch = window.fetch;

const fetchFunction = (url, options = {}) => {
  if (session && session.token) {
    options.headers = Object.assign({}, options.headers, {'Authorization': 'Bearer ' + session.token});
  }
  return window.originalFetch(url, options)
    .then((response) => {
      if (response.status === 401) {
        logOut();
      }
      return response;
    })
    .catch((err) => {
      throw err;
    });
};

window.fetch = fetchFunction;