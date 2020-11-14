import { PROFESIONALES_API_URL } from "../constants.js";

class Profesional {
  constructor(
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    matricula,
    telefono,
    email,
    domicilio,
    sexo
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fechaNacimiento = fechaNacimiento;
    this.matricula = matricula;
    this.telefono = telefono;
    this.email = email;
    this.domicilio = domicilio;
    this.sexo = sexo;
  }
}

const formProfesional = document.getElementById("formProfesional");

function PostProfesional(profesionaljson) {
  fetch(PROFESIONALES_API_URL, {
    method: "POST",
    body: profesionaljson,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      formProfesional.innerHTML = `<div class="card text-center p-5 my-2">
      <div class="card-header bg-transparent text-success border-0">
        <i class="far fa-check-circle display-4 d-block"></i>
        <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
      </div>
      <div class="card-body">
        <p class="card-text lead">El Profesional ha sido registrado con éxito (ID: ${data.id}).</p>
        <p class="card-text text-muted">Nombre: ${data.nombre}</p>
        <p class="card-text text-muted">Matricula: ${data.matricula}</p>
        <a href="/" class="btn btn-primary m-auto">Ir al menu </a>
      </div>
    </div>`;
    })
    .catch((err) => console.log("Error:", err));
}

formProfesional.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("dni").value;
  const fechaNacimiento = document.getElementById("fechanacimiento").value;
  const matricula = document.getElementById("matricula").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const domicilio = document.getElementById("domicilio").value;
  var checkbox = document.getElementsByName("optradio");
  var sexo = null;
  if (checkbox[0].checked) {
    sexo = checkbox[0].value;
  } else {
    sexo = checkbox[1].value;
  }

  var profesional = new Profesional(
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    matricula,
    telefono,
    email,
    domicilio,
    sexo
  );
  var profesionaljson = JSON.stringify(profesional);

  PostProfesional(profesionaljson);
});
