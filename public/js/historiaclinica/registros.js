import { PACIENTES_API_URL } from "../constants.js";

const formpacienteid = document.getElementById("form-input-paciente");

window.addEventListener("load", () => {
  if (formpacienteid) {
    formpacienteid.onsubmit = async function (e) {
      e.preventDefault();
      const pacientedni = document.getElementById("input-paciente").value;
      await getPacienteByDni(pacientedni);
    };
  }
});

async function getPacienteByDni(pacientedni) {
  await fetch(PACIENTES_API_URL + `/dni/${pacientedni}`)
    .then((res) => res.json())
    .then((data) => {
      mostrarDatos(data);
    })
    .catch((err) => console.log(err));
}

function mostrarDatos(paciente) {
  const nombre = document.querySelector("#nombre");
  const apellido = document.querySelector("#apellido");
  const dni = document.querySelector("#dni");
  const labelnotfound = document.getElementById("label-notfound");
  const btnhistorial= document.getElementById("mostrarHistorial");


  if (paciente.nombre !== undefined) {
    labelnotfound.setAttribute("hidden", true);
    nombre.innerHTML = `Nombre: ${paciente.nombre}`;
    apellido.innerHTML = `Apellido: ${paciente.apellido}`;
    dni.innerHTML = `Numero de documento: ${paciente.dni}`;
    btnhistorial.setAttribute("href","/historiaClinica/historia"+`?pacienteid=${paciente.paciente_Id}`);

 
  } else {
    if (labelnotfound.hidden) {
      labelnotfound.removeAttribute("hidden");
      nombre.innerHTML = `Nombre: No se ha encontrado`;
      apellido.innerHTML = `Apellido: No se ha encontrado`;
      dni.innerHTML = `Numero de documento: No se ha encontrado`;
    } else {
      labelnotfound.setAttribute("hidden");
    }
  }
}
