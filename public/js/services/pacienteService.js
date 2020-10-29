import {PACIENTES_API_URL} from '../constants.js'

const getPacientebyID = (id) => {
  return fetch(`${PACIENTES_API_URL}/${id}`)
    .then(response => response.json())
    .catch(err => console.log('ERROR: ' + err))
}

const getAllPacientes = () => {
  return fetch(PACIENTES_API_URL)
    .then(response => response.json())
    .catch(err => console.log('ERROR: ' + err))
}

const postPaciente = (paciente) => {
  return fetch(PACIENTES_API_URL)
    .then(response => response.json())
    .catch(err => console.log('ERROR: ' + err))
}

export {
  getPacientebyID,
  getAllPacientes,
  postPaciente
}