import { TURNOS_API_URL, TURNOS_DISPONIBLES_API_URL } from "../constants.js"

const GetTurnos = () => {
  return fetch(TURNOS_API_URL)
    .then(response => response.json())
    .catch(err => console.log('ERROR: ' + err))
};

const GetTurnosDisponibles = (especialidad = 10, fecha) => {
  const url = TURNOS_DISPONIBLES_API_URL + "?fecha=" + fecha + "&IdEspecialista=" + especialidad;
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log('ERROR: ' + err))
};

export default {
  GetTurnos,
  GetTurnosDisponibles,
};