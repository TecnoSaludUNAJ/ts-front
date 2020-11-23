import {getPacientebyUserId} from '../services/pacienteService.js';

export const session = localStorage.getItem("session")
  ? JSON.parse(localStorage.getItem("session"))
  : null;

export const logOut = () => {
  localStorage.removeItem("session");
  window.location.assign("/");
}

export const loadPacienteIntoSession  = async() => {
  let paciente = await getPacientebyUserId(session.usuario.id);
  if(paciente){
    // cargo datos en la respuesta
    session.paciente = paciente
    localStorage.setItem("session", JSON.stringify(session));
  }
  else{
    // no existe, redirecciono a que complete los datos.
    localStorage.setItem("session", JSON.stringify(sessionLogIn));
    window.location.assign("/paciente/registrar");
  }

}