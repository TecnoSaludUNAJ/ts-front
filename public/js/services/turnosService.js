import { TURNOS_API_URL, TURNOS_DISPONIBLES_API_URL, CALENDARIO_TURNOS_API } from "../constants.js"
import { session } from "../usuario/session.js";

const GetTurnos = () => {
  return fetch(TURNOS_API_URL + "?IdPaciente=" + session.paciente.paciente_Id)
    .then(response => response.json())
    .catch(err => console.error('ERROR: ' + err))
};

const GetTurnosDisponibles = (especialidad, fecha) => {
  const url = TURNOS_DISPONIBLES_API_URL + "?fecha=" + fecha + "&IdEspecialidad=" + especialidad;
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.error('ERROR: ' + err))
};

const PostTurnos = (body) => {
  return fetch(TURNOS_API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .catch(err => console.error('ERROR: ' + err))
};

export const GetTurnosEspecialista = (especialista, especialidad, fecha) => {
  const url = TURNOS_API_URL + "/Especialista/" + especialista + "?especialidad=" + especialidad + "&fecha=" + fecha;
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.error('ERROR: ' + err))
};

export const GetJornadaEspecialistaEspecialidad = (especialista, especialidad, dia) => {
  const url = CALENDARIO_TURNOS_API + "/Especialista/" + especialista + "?DiaId=" + dia + "&IdEspecialidad=" + especialidad;
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.error('ERROR: ' + err))
};


export default {
  GetTurnos,
  GetTurnosDisponibles,
  PostTurnos
};