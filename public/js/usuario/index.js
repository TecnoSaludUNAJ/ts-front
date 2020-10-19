console.log("estoy usuando js/usuario/index.js")

// logOut
const logOut = () => {
    alert("Sesion finalizada");
    window.location.assign("/");
}
// vincular btnLogOut
let btnLogOut = document.getElementById("btnLogOut");
if(btnLogOut) btnLogOut.addEventListener("click", logOut);