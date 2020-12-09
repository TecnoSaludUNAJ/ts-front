import {getParamURL} from '../utils.js';
import {getPacientebyDNI, getPacientebyID} from '../services/pacienteService.js';
import {session} from '../usuario/session.js'

const pacienteId = getParamURL("pacienteId");

const buscadorPaciente = document.getElementById("buscadorPaciente");
const formHistoriaClinica = document.getElementById("addHistoriaClinica");
let pacienteIDResult ;

window.addEventListener(
  "load",
  () => {
    buscadorPaciente.onsubmit = function (e) {
      e.preventDefault();
      loadPacienteByDNI($("#dniFind").val());
    }
    if(pacienteId){
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
  let especialidadId = session.especialidadSelected.especialidadId;
  // paciente
  let paciente_Id = $("#pacienteId").val();
  // form data
  let motivo = $("#motivo").val();
  let proximaconsulta = new Date($("#proximaconsulta").val());
  let diagnostico = $("#diagnostico").val();
  let analisis = $("#analisis").val();
  let receta = $("#receta").val();
  // post
  console.log(motivo);
}