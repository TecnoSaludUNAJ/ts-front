import {REGISTROUSER_API_URL} from '../constants.js';

const postRegisterUsuario = (usuario) => {
  return fetch(REGISTROUSER_API_URL, {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log("ERROR: " + err));
};

class UsuarioDTO {
  constructor(nombres, apellidos, dni, sexo, email, telefono, password) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.dni = dni;
    this.sexo = sexo;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
  }
}

export { postRegisterUsuario, UsuarioDTO };
