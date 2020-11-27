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
  const labelnotfound = document.getElementById("label-notfound");
  const btnhistorial = document.getElementById("btnhistorial");
  const fechanacimiento = document.querySelector("#fechanacimiento");
  const domicilio = document.querySelector("#domicilio");
  const email = document.querySelector("#email");
  const telefono = document.querySelector("#telefono");
  const estadocivil = document.querySelector("#estadocivil");
  const nacionalidad = document.querySelector("#nacionalidad");
  const obrasocial = document.querySelector("#obrasocial");

  if (paciente.nombre !== undefined) {
    labelnotfound.setAttribute("hidden", true);
    nombre.innerHTML = `${paciente.nombre}`;
    apellido.innerHTML = ` ${paciente.apellido}`;
    fechanacimiento.innerHTML = `${paciente.fecha_Nacim}`;
    domicilio.innerHTML = `${paciente.domicilio}`;
    email.innerHTML = `${paciente.email}`;
    telefono.innerHTML = `${paciente.telefono}`;
    estadocivil.innerHTML = `${paciente.estado_Civil}`;
    nacionalidad.innerHTML = `${paciente.nacionalidad}`;
    obrasocial.innerHTML = `${paciente.obraSocial_Id}`;

    btnhistorial.setAttribute(
      "href",
      "/historiaClinica/historia" + `?pacienteid=${paciente.paciente_Id}`
    );
  } else {
    if (labelnotfound.hidden) {
      labelnotfound.removeAttribute("hidden");
      nombre.innerHTML = ``;
      apellido.innerHTML = ``;
      fechanacimiento.innerHTML = ``;
      domicilio.innerHTML = ``;
      email.innerHTML = ``;
      telefono.innerHTML = ``;
      estadocivil.innerHTML = ``;
      nacionalidad.innerHTML = ``;
      obrasocial.innerHTML = ``;
    } else {
      labelnotfound.setAttribute("hidden");
    }
  }
}
