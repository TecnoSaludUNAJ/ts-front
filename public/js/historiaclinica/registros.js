import { PACIENTES_API_URL } from "../constants.js";

const formpacienteid = document.getElementById("form-input-paciente");

window.addEventListener("load", () => {
  formpacienteid.onsubmit = async function (e) {
    e.preventDefault();
    const pacientedni = document.getElementById("input-paciente").value;
    await getPacienteByDni(pacientedni);
  };
});

async function getPacienteByDni(pacientedni) {
  await fetch(PACIENTES_API_URL + `/dni/${pacientedni}`)
    .then((res) => res.json())
    .then((data) => {
         mostrarDatos(data);
    })
    .catch(err=>console.log(err));
}

function mostrarDatos(paciente) {
    console.log(paciente);
    const nombre= document.querySelector("#nombre");
    nombre.innerHTML=`Nombre: ${paciente.nombre}`;
    const apellido= document.querySelector("#apellido");
    apellido.innerHTML=`Apellido: ${paciente.apellido}`;
    const dni= document.querySelector("#dni");
    dni.innerHTML=`Numero de documento: ${paciente.dni}`;
}