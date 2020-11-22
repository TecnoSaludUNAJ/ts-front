import {
  UsuarioDTO,
  postRegisterUsuario,
} from "../services/autenticacionService.js";

const registroPacienteDOM = document.getElementById("registroPaciente");
const showAlertDOM = document.getElementById("showAlert");

window.onload = () => {
  registroPacienteDOM.onsubmit = function (e) {
    e.preventDefault();
    showAlertDOM.innerHTML = '';
    let nombres = registroPacienteDOM.elements.nombre.value;
    let apellidos = registroPacienteDOM.elements.apellido.value;
    let dni = registroPacienteDOM.elements.dni.value;
    let sexo = registroPacienteDOM.elements.sexo.value;
    let email = registroPacienteDOM.elements.email.value;
    let telefono = registroPacienteDOM.elements.telefono.value;
    let password = registroPacienteDOM.elements.password.value;
    let password2 = registroPacienteDOM.elements.password2.value;
    if (password == password2) {
      registerUsuario(nombres, apellidos, dni, sexo, email, telefono, password);
    } else {
      showAlertDOM.innerHTML = `<div class="alert alert-danger" role="alert">La contaseña ingresada no es la misma en la confirmación, reescriba e intente nuevamente.</div>`;
      registroPacienteDOM.elements.password.value = '';
      registroPacienteDOM.elements.password2.value = '';
    }
  };
};

const registerUsuario = async (
  nombres,
  apellidos,
  dni,
  sexo,
  email,
  telefono,
  password
) => {
  // validate before
  let usuarioDTO = new UsuarioDTO(
    nombres,
    apellidos,
    dni,
    sexo,
    email,
    telefono,
    password
  );
  let usuarioPost = await postRegisterUsuario(usuarioDTO);
  usuarioPost
    ? managepostRegistroResults(usuarioPost)
    : showAlertDOM.innerHTML = `<div class="alert alert-warning" role="alert">El servicio de registro no se encuentra disponible actualmente.</div>`;
};

const managepostRegistroResults = (usuarioResponse) => {
  if (usuarioResponse.id) {
    registroPacienteDOM.innerHTML = `<div class="card text-center py-3 align-content-center" id="cardBig">
      <i class="fas fa-check-circle icon text-success"></i>
      <div class="card-body">
        <h3 class="title font-weight-normal">¡Registro exitoso!</h3>
        <p class="message lead text-muted py-2">Has sido registrado con éxito en nuestro sistema, continua para iniciar sesión</p>
        <div class="extraBody">
        <a class="btn btn-primary btn-lg px-5" href="/usuario/login" role="button">Continuar</a>
        </div>
      </div>
      </div>`;
  } else {
    usuarioResponse.error = usuarioResponse.error || "Ha ocurrido un error.";
    showAlertDOM.innerHTML = `<div class="alert alert-danger" role="alert">${usuarioResponse.message}</div>`;
  }
};
