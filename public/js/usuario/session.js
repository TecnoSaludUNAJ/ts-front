import { ROL_ADMIN, ROL_PACIENTE, ROL_PROFESIONAL } from "../constants.js";
import { getPacientebyUserId } from "../services/pacienteService.js";
import { getProfesionalbyUserId } from "../services/profesionalService.js";

export const session = localStorage.getItem("session")
  ? JSON.parse(localStorage.getItem("session"))
  : null;

export const logOut = () => {
  localStorage.removeItem("session");
  window.location.href = window.origin;
};

export const sessionUserMenu = () => {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  const sessionNav = document.getElementById("sessionNav");
  sessionNav.innerHTML = `
  <li class="nav-item border-right pr-2">
      <span class="user-info align-middle pr-1">
        <span class="user-fullname text-capitalize">
          ${session.usuario.nombres} ${session.usuario.apellidos}
        </span>
        <span class="user-role text-muted small">
        ${rolString(session.usuario.rolId)}
        </span>
      </span>
      <span class="user-av align-middle">
      <i class="fas fa-user-circle text-muted"></i>
      </span>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="/usuario/logout" data-toggle="tooltip" data-placement="bottom" title="Cerrar sesión"><i class="fas fa-sign-out-alt"></i></a>
  </li>
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

export const loadInfoUserIntoSession = async () => {
  // CASE PACIENTE
  if (session.usuario.rolId == ROL_PACIENTE && !session.paciente) {
    let paciente = await getPacientebyUserId(session.usuario.id);
    if (paciente) {
      // cargo datos en la respuesta
      session.paciente = paciente;
      localStorage.setItem("session", JSON.stringify(session));
      window.location.reload();
    }
  }
  // CASE PROFESIONAL
  if (session.usuario.rolId == ROL_PROFESIONAL && !session.profesional) {
    let profesional = await getProfesionalbyUserId(session.usuario.id);
    if (profesional) {
      session.profesional = profesional;
      localStorage.setItem("session", JSON.stringify(session));
      window.location.reload();
    }
  }
};
