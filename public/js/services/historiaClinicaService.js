import {HISTORIA_API_URL, REGISTROS_API_URL} from '../constants.js';

export const getHistoriaClinica = (pacienteid) => {
  return fetch(HISTORIA_API_URL + "/" + pacienteid)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

export const postRegistroHC = (RegistroDTO) => {
  return fetch(REGISTROS_API_URL, {
    method: "POST",
    body: JSON.stringify(RegistroDTO),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
}

export class RegistroHistoriaDTO {
  constructor(
    especialistaId,
    motivoConsulta,
    proximaRevision,
    fechaRegistro,
    diagnostico,
    analisis,
    receta, 
    pacienteId
  ) {
  this.especialistaId = especialistaId;
  this.motivoConsulta = motivoConsulta;
  this.proximaRevision = proximaRevision;
  this.fechaRegistro = fechaRegistro;
  this.diagnostico = diagnostico;
  this.analisis = analisis;
  this.receta = receta;
  this.pacienteId = pacienteId;
  }
}