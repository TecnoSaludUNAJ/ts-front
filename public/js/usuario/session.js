import { getPacientebyUserId } from "../services/pacienteService.js";
import { ROL_ADMIN, ROL_PACIENTE, ROL_PROFESIONAL } from "../constants.js";

export const session = localStorage.getItem("session")
  ? JSON.parse(localStorage.getItem("session"))
  : null;

export const logOut = () => {
  localStorage.removeItem("session");
  window.location.assign("/");
};

export const loadPacienteIntoSession = async () => {
  let paciente = await getPacientebyUserId(session.usuario.id);
  if (paciente) {
    // cargo datos en la respuesta
    session.paciente = paciente;
    localStorage.setItem("session", JSON.stringify(session));
  } else {
    // no existe, redirecciono a que complete los datos.
    localStorage.setItem("session", JSON.stringify(sessionLogIn));
    window.location.assign("/paciente/registrar");
  }
};

export const sessionMenu = () => {
  const sessionNav = document.getElementById("sessionNav");
  sessionNav.innerHTML = `
  <ul class="nav nav-user">
    <li class="nav-item">
      <a class="nav-link">
      <div class="row">
        <div class="col-4">
          <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" width="50" height="50" class="rounded-circle" alt="Avatar">
        </div>
        <div class="col-8">
          <div class="text-truncate">
            ${session.usuario.nombres} ${session.usuario.apellidos}
          </div>
          <small class="text-muted">${rolString(session.usuario.rolId)}</small>
        </div>
      </div>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/usuario/logout" ><i class="fas fa-sign-out-alt"></i></a>
    </li>
  </ul>
  `;
};

const rolString = (num) => {
  switch (num) {
    case ROL_ADMIN:
      return "Administrador";
    case ROL_PROFESIONAL:
      return "Profesional";
    case ROL_PACIENTE:
      return "Paciente";
  }
};
