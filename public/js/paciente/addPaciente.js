import {postPaciente, getObrasSociales, PacienteDTO} from '../services/pacienteService.js'
import {paises} from './paises.js'
import {session} from '../usuario/session.js'
import { ROL_PACIENTE} from '../constants.js'
import { getPacientebyUserId } from "../services/pacienteService.js";

const registroForm = document.getElementById("registroPaciente");
const obraSocialSelect = document.getElementById("obrasocial");

window.addEventListener(
  "load",
  () => {
    // preload data
    loadNacionalidades();
    loadObrasSociales();
    // register form
    registroForm.onsubmit = function (e) {
      e.preventDefault();
      registrarCliente();
    };
  },
  false
);

const loadNacionalidades = () => {
  const nacionalidadSelect = document.getElementById("nacionalidad");
  if(nacionalidadSelect){
  paises.forEach(pais => {
    let option = document.createElement("option");
    option.text = pais[0];
    nacionalidadSelect.add(option);
  })
}
}

/* ADD OS */
const addOptionSelectDOM = (o, domElement) => {
  let option = document.createElement("option");
  option.text = `${o.obraSocial_Sigla} - ${o.obraSocial_Nombre}`;
  option.value = o.obraSocial_Id;
  domElement.add(option);
}

const loadObrasSociales = async () => {
  let obrasociales = await getObrasSociales();
  obrasociales
    ? obrasociales.map(o => addOptionSelectDOM(o, obraSocialSelect))
    : console.warn("Error al cargar obras sociales");
};

const registrarCliente = async () => {
  // data from form
  let nombre = $("#nombre").val();
  let apellido = $("#apellido").val();
  let dni = $("#dni").val();
  let sexo = $("#sexo").val();
  let nacionalidad = $("#nacionalidad").val();
  let estadocivil = $("#estadocivil").val();
  let fechanacim = $("#fechanacim").val();
  let domicilio = $("#domicilio").val();
  let email = $("#email").val();
  let telefono = $("#telefono").val();
  let obrasocial = parseInt($("#obrasocial").val());
  let usuarioId = session.usuario.id;

  // validate numbers
  if(isNaN(obrasocial) || isNaN(usuarioId)){
    alert("Los campos deben ser numéricos.")
  }else{
    let paciente = new PacienteDTO(
      nombre,
      apellido,
      dni,
      sexo,
      nacionalidad,
      estadocivil,
      fechanacim,
      domicilio,
      email,
      telefono,
      obrasocial,
      usuarioId
    );
    console.log(paciente)
    let pacientePost = await postPaciente(paciente);
    pacientePost
      ? managePacientePostResponse(pacientePost)
      : console.log("El servicio de registro no se encuentra disponible actualmente.");
  }
}

const loadPacienteIntoSession = async () => {
  let paciente = await getPacientebyUserId(session.usuario.id);
  if (paciente) {
    // cargo datos en la respuesta
    session.paciente = paciente;
    localStorage.setItem("session", JSON.stringify(session));
  } else {
    // no existe, redirecciono a que complete los datos.
    localStorage.setItem("session", JSON.stringify(sessionLogIn));
    window.location.assign("/paciente/registrar");
  }
};

const managePacientePostResponse = (pacientePostresponse) => {
  if (pacientePostresponse.paciente_Id) {
    registroForm.innerHTML= `<div class="card text-center p-5 my-2">
    <div class="card-header bg-transparent text-success border-0">
      <i class="far fa-check-circle display-4 d-block"></i>
      <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
    </div>
    <div class="card-body">
      <p class="card-text lead">El paciente ha sido registrado correctamente.</p>
    </div>
  </div>`
    // cargarlo en session
    loadPacienteIntoSession()
  } else {
    pacientePostresponse.message = pacientePostresponse.message || "Ha ocurrido un error.";
    registroForm.innerHTML+= `<div class="alert alert-danger p-2 my-2" role="alert">
    ${pacientePostresponse.message}
  </div>`
  }
}