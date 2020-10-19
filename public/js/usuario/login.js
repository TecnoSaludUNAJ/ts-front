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
            // llamar a servicio de autenticacion
            // ejemplo ahora con DNI
            alert(`DNI: ${dni} // contraseña: ${password}`)
        }
    }
}
