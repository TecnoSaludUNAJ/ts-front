import {postLoginUsuario, LoginDTO} from '../services/autenticacionService.js';
import { getPacientebyUserId } from "../services/pacienteService.js";


const logInForm = document.getElementById("loginForm");

if(logInForm) {
    logInForm.onsubmit = (e) => {
        e.preventDefault()
        let dni = logInForm.elements.dni.value
        let password = logInForm.elements.password.value
        if(dni === "")
            alert("DNI vacio")
        if(password === "")
            alert("Contraseña vacia")
        else{
            logInUsuario(dni, password)
        }
    }
}

const logInUsuario = async (dni, password) => {
    const response = await postLoginUsuario(new LoginDTO(dni, password));
    console.log(response)
    response
      ? manageResponseUsuario(response)
      : alert("Usuario o contraseña ingresados no validos.");
};

const manageResponseUsuario = async (responseUsuario) => {
    const ROL_PROFESIONAL = 2;
    const ROL_PACIENTE = 3;
    let sessionLogIn = responseUsuario;
    // cargar tipo de usuario (segun rol)
    switch(responseUsuario.usuario.rolId) {
        case ROL_PROFESIONAL:
            alert("Es un profesional")
            break;
        case ROL_PACIENTE:
            let paciente = await getPacientebyUserId(sessionLogIn.usuario.id);
            if (paciente) {
              sessionLogIn.paciente = paciente;
            }else{

              window.location.assign("/paciente/registrar");
            }
            break;
    }
    localStorage.setItem("session", JSON.stringify(sessionLogIn));
    window.location.assign("/");
};
