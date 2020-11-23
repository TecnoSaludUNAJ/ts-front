import { ESPECIALIDADES_API_URL, Especialidad } from "../constants.js";

const registroForm = document.getElementById("form-especialidad");

async function PostEspecialidad(especialidadjson) {
  await fetch(ESPECIALIDADES_API_URL, {
    method: "POST",
    body: especialidadjson,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      registroForm.innerHTML = `<div class="card text-center p-5 my-2">
      <div class="card-header bg-transparent text-success border-0">
        <i class="far fa-check-circle display-4 d-block"></i>
        <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
      </div>
      <div class="card-body">
        <p class="card-text lead">La Especialidad ha sido registrada con éxito (ID: ${data.id}).</p>
        <p class="card-text text-muted">Especialidad:${data.tipoEspecialidad}</p>
        <a href="/" class="btn btn-primary m-auto">Ir al menu </a>
      </div>
    </div>`;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

window.addEventListener("load", () => {
  registroForm.onsubmit = async function (e) {
    e.preventDefault();
    const tipoEspecialidad = document.getElementById("input-especialidad")
      .value;

    var especialidad = new Especialidad(tipoEspecialidad);
    var especialidadjson = JSON.stringify(especialidad);

    await PostEspecialidad(especialidadjson);
  };
});
