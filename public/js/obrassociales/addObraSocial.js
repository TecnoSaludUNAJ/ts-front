import {postObraSocial, ObraSocialDTO} from '../services/pacienteService.js'

const registroForm = document.getElementById("registroObraSocial");

window.addEventListener(
  "load",
  () => {
    // register form
    registroForm.onsubmit = function (e) {
      e.preventDefault();
      registrarObraSocial();
    };
  },
  false
);


const registrarObraSocial = async () => {
  // data from form
  let sigla = $("#sigla").val();
  let nombre = $("#nombre").val();

  // validate numbers
  if(sigla == "" || nombre == ""){
    alert("Los campos no pueden estar vacíos.")
  }else{
    let obraSocial = new ObraSocialDTO(
      sigla,
      nombre
    );
    let obraSocialPost = await postObraSocial(obraSocial);
    obraSocialPost
      ? managePostResponse(obraSocialPost)
      : console.log("El servicio de registro no se encuentra disponible actualmente.");
  }
}

const managePostResponse = (obraSocialResponse) => {
  if (obraSocialResponse.obraSocial_Id) {
    registroForm.innerHTML= `<div class="card text-center p-5 my-2">
    <div class="card-header bg-transparent text-success border-0">
      <i class="far fa-check-circle display-4 d-block"></i>
      <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
    </div>
    <div class="card-body">
      <p class="card-text lead">La obra social ha sido registrada con éxito (ID: ${obraSocialResponse.obraSocial_Id}).</p>
      <p class="card-text text-muted">Sigla: ${obraSocialResponse.obraSocial_Sigla}</p>
      <p class="card-text text-muted">Nombre: ${obraSocialResponse.obraSocial_Nombre}</p>
      <a href="/obrassociales/" class="btn btn-primary m-auto">Ir a la lista de obras sociales </a>
    </div>
  </div>`
  } else {
    obraSocialResponse.message = obraSocialResponse.message || "Ha ocurrido un error.";
    registroForm.innerHTML+= `<div class="alert alert-danger p-2 my-2" role="alert">
    ${obraSocialResponse.message}
  </div>`
  }
}