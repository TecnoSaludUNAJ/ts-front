import {getParamURL} from '../utils.js';
import {getPacientebyID, getObraSocialbyId} from '../services/pacienteService.js';

const pacienteId = getParamURL("pacienteId");
const datosPacienteDOM = document.getElementById("datosPaciente");

window.addEventListener(
  "load",
  () => {
    if(pacienteId){
      loadPaciente(pacienteId)
    }
    else{
      showError("No se ha detectado la ID de paciente en la URL")
    }
  },
  false
);

const loadPaciente = async (pacienteId) => {
  let paciente = await getPacientebyID(pacienteId);
  if(paciente.paciente_Id){
    addInfoPacienteToDOM(paciente);
    let obrasocial = await getObraSocialbyId(paciente.obraSocial_Id)
    if(obrasocial)
      $("#obrasocial").text(obrasocial.obraSocial_Sigla + " - " + obrasocial.obraSocial_Nombre);
  }
  else{
    showError("Error al cargar paciente.")
  }
};

const addInfoPacienteToDOM = (paciente) => {
  $("#nombre").text(paciente.nombre);
  $("#apellido").text(paciente.apellido)
  $("#dni").text(paciente.dni)
  $("#sexo").text(paciente.sexo)
  $("#nacionalidad").text(paciente.nacionalidad)
  $("#estadocivil").text(paciente.estado_Civil)
  $("#fechanacim").text(new Date(paciente.fecha_Nacim).toLocaleDateString())
  $("#pacienteId").text(paciente.paciente_Id)
}

const showError = (text) => {
  $("#showError").text(text)
  $("#showError").removeClass("d-none")
}