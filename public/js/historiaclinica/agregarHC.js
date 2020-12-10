import {getParamURL} from '../utils.js';
import {getPacientebyDNI, getPacientebyID} from '../services/pacienteService.js';
import {postRegistroHC, RegistroHistoriaDTO} from '../services/historiaClinicaService.js';
import {session} from '../usuario/session.js'

const pacienteId = getParamURL("pacienteId");

const buscadorPaciente = document.getElementById("buscadorPaciente");
const formHistoriaClinica = document.getElementById("addHistoriaClinica");

let pacienteIDResult;

window.addEventListener(
  "load",
  () => {
    buscadorPaciente.onsubmit = function (e) {
      e.preventDefault();
      loadPacienteByDNI($("#dniFind").val());
    }
    if(pacienteId){
      pacienteIDResult = pacienteId;
      $("#buscadorPaciente").addClass("d-none")
      loadPaciente(pacienteId)
    }
    else{
      
    };
    // 
    formHistoriaClinica.onsubmit = function (e) {
      e.preventDefault();
      addHistoriaClinica();
    }
    }
  ,
  false
);

const loadPaciente = async (pacienteId) => {
  let paciente = await getPacientebyID(pacienteId);
  $("#datosPaciente").removeClass("d-none")
  if(paciente.paciente_Id){
    $("#nombrecompleto").text(paciente.nombre + " " + paciente.apellido);
    $("#dni").text(paciente.dni);
    $("#pacienteId").text(paciente.paciente_Id);
    $('#btnSubmit').attr("disabled", false);
  }
  else{
    showError("No se ha encontrado ningún paciente.")
  }
};


const loadPacienteByDNI = async (dni) => {
  $("#showError").addClass("d-none")
  let paciente = await getPacientebyDNI(dni);
  if(paciente.paciente_Id){
    pacienteIDResult = paciente.paciente_Id;
    $("#datosPaciente").removeClass("d-none")
    $("#nombrecompleto").text(paciente.nombre + " " + paciente.apellido);
    $("#dni").text(paciente.dni);
    $("#pacienteId").text(paciente.paciente_Id);
    $('#btnSubmit').attr("disabled", false);
  }
  else{
    showError("No se ha encontrado ningún paciente con el DNI ingresado.")
  }
};


const showError = (text) => {
  $("#showError").text(text)
  $("#showError").removeClass("d-none")
}

const addHistoriaClinica = async () => {
  // profesional
  let especialistaId = session.especialidadSelected.especialistaId;
  // paciente
  let pacienteId = parseInt(pacienteIDResult);
  // form data
  let motivoConsulta = $("#motivo").val();
  let proximaRevision = new Date($("#proximaconsulta").val()).toISOString();
  let diagnostico = $("#diagnostico").val();
  let analisis = $("#analisis").val();
  let receta = $("#receta").val();
  let fechaRegistro = new Date().toISOString();

  let RegistroHistoriaClinica = new RegistroHistoriaDTO(
    especialistaId,
    motivoConsulta,
    proximaRevision,
    fechaRegistro,
    diagnostico,
    analisis,
    receta, 
    pacienteId
  );
  // post
  console.log(RegistroHistoriaClinica);
  let postRegistro = await postRegistroHC(RegistroHistoriaClinica);
  if(postRegistro.registroId){
    formHistoriaClinica.innerHTML = `<div class="card text-center p-5 my-2">
    <div class="card-header bg-transparent text-success border-0">
      <i class="far fa-check-circle display-4 d-block"></i>
      <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
    </div>
    <div class="card-body">
      <p class="card-text lead">La historia clínica ha sido registrado correctamente con el <b>ID: ${postRegistro.registroId}</b>.</p>
    </div>
  </div>` 
  }
  else{
    showError("Ha ocurrido un error al insertar el registro.")
  }
}