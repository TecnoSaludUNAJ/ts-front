import {HISTORIA_API_URL} from '../constants.js';

export const getHistoriaCLinica = (pacienteid) => {
  return fetch(HISTORIA_API_URL + "/" + pacienteid)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};