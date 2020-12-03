import { PROFESIONALES_API_URL } from "../constants.js";

const getProfesionalbyUserId = (id) => {
  return fetch(`${PROFESIONALES_API_URL}/userId/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};


export {getProfesionalbyUserId}