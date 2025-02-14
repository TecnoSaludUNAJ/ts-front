import { PACIENTES_API_URL, OBRASSOCIALES_API_URL } from "../constants.js";

const getPacientebyID = (id) => {
  return fetch(`${PACIENTES_API_URL}/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

const getPacientebyDNI = (dni) => {
  return fetch(`${PACIENTES_API_URL}/dni/${dni}`)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

const getPacientebyUserId = (id) => {
  return fetch(`${PACIENTES_API_URL}/userId/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

const getAllPacientes = () => {
  return fetch(PACIENTES_API_URL)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

const postPaciente = (paciente) => {
  return fetch(PACIENTES_API_URL, {
    method: "POST",
    body: JSON.stringify(paciente),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

const getObrasSociales = () => {
  return fetch(OBRASSOCIALES_API_URL)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

const getObraSocialbyId = (id) => {
  return fetch(`${OBRASSOCIALES_API_URL}/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

const postObraSocial = (obrasocial) => {
  return fetch(OBRASSOCIALES_API_URL, {
    method: "POST",
    body: JSON.stringify(obrasocial),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

class PacienteDTO {
  constructor(
      nombre,
      apellido,
      dni,
      sexo,
      nacionalidad,
      estadocivil,
      fechanacim,
      domicilio,
      email,
      telefono,
      obrasocial,
      usuarioId
    ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.sexo = sexo;
    this.nacionalidad = nacionalidad;
    this.estado_Civil = estadocivil;
    this.fecha_Nacim = fechanacim;
    this.domicilio = domicilio;
    this.email = email;
    this.telefono = telefono;
    this.obraSocial_Id = obrasocial;
    this.usuario_Id = usuarioId;
  }
}

class ObraSocialDTO {
  constructor(
      nombre,
      sigla
    ) {
    this.obraSocial_Nombre = nombre;
    this.obraSocial_Sigla = sigla;
  }
}


export { getPacientebyID, getPacientebyDNI, getPacientebyUserId, getAllPacientes, postPaciente, getObrasSociales, getObraSocialbyId, postObraSocial, PacienteDTO, ObraSocialDTO };
