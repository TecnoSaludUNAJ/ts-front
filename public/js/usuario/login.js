import {postLoginUsuario, LoginDTO} from '../services/autenticacionService.js';

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

const manageResponseUsuario = (responseUsuario) => {
    localStorage.setItem("session", JSON.stringify(responseUsuario));
    window.location.assign("/");
};
